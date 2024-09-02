import fetch from "node-fetch";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
   try {
      const { accessToken, refreshToken } = req.cookies;

      if (!refreshToken || typeof refreshToken !== "string" || refreshToken === "undefined") {
         return res.status(401).json({ message: "Unauthorized" });
      }

      if (
         (!accessToken || typeof accessToken !== "string" || accessToken === "undefined") &&
         (!refreshToken || typeof refreshToken !== "string" || refreshToken === "undefined")
      ) {
         return res.status(401).json({ message: "Unauthorized" });
      }

      let isValidAccessToken;
      let isValidRefreshToken;

      try {
         isValidRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      } catch (error) {
         return res.status(401).json({ message: "Unauthorized" });
      }

      if (
         isValidRefreshToken &&
         accessToken &&
         typeof accessToken === "string" &&
         accessToken.length > 0
      ) {
         try {
            isValidAccessToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
         } catch (error) {
            return res.status(401).json({ message: "Unauthorized" });
         }
      }

      if (isValidRefreshToken && !accessToken) {
         try {
            const response = await fetch("http://localhost:3000/api/v1/user/refresh", {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ refreshToken }),
            });
            const data = await response.json();

            if (response.ok) {
               return res
                  .status(200)
                  .cookie("accessToken", data.accessToken, {
                     secure: true,
                     httpOnly: true,
                     maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
                  })
                  .json({ message: "Token refreshed successfully" });
            }
         } catch (error) {
            return res
               .status(401)
               .cookie("accessToken", "")
               .json({ message: error?.message || "Token refresh failed" });
         }
      }

      if (!isValidAccessToken || !isValidRefreshToken) {
         return res.status(401).json({ message: "Unauthorized" });
      }
      const user = await User.findOne({ _id: isValidAccessToken._id });
      if (
         !user ||
         user.refreshToken !== refreshToken ||
         isValidRefreshToken._id !== user._id.toString() ||
         isValidAccessToken._id !== isValidRefreshToken._id
      ) {
         return res.status(401).json({ message: "Unauthorized" });
      }

      req.user = user;
      next();
   } catch (error) {
      console.error("Auth Middleware Error:", error);
      res.status(500).json({ message: "Internal server error" });
   }
};
