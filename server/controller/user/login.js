import User from "../../models/userModel.js";

const login = async (req, res) => {
   try {
      const { email, password } = await req.body;

      if (!email || !password)
         return res.status(400).json({ message: "All fields are required!", code: 400 });

      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "Invalid credentials!", code: 404 });

      const isMatch = await user.matchPassword(password);

      if (!isMatch) return res.status(404).json({ message: "Invalid credentials!", code: 404 });

      const refreshToken = await user.generateRefreshToken();
      const accessToken = await user.generateAuthToken();

      if (!refreshToken || !accessToken)
         return res.status(500).json({ message: "Something went wrong!", code: 500 });

      user.refreshToken = refreshToken;   

      await user.save();

      res.status(200)
         .cookie("refreshToken", refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days * long living
         })
         .cookie("accessToken", accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day *short living
         })
         .json({ user });
   } catch (error) {
      res.status(500).json(error?.message || "Invalid credientials!");
   }
};

export { login };
