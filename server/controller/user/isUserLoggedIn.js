// check if the the user if loggedIn or not and send the true or false based on the scenerio

const isUserLoggedIn = async (req, res) => {
   try {
      res.status(200).json({
         loggedIn: req.user ? true : false,
      });
   } catch (error) {
      res.status(500).json(error);
   }
};

export { isUserLoggedIn };
