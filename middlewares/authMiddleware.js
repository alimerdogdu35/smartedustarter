const jwt = require("jsonwebtoken");

const authSecretKey = "keykeykey";

exports.authwho = async (req,res,next)=>{

  try {
    if (!req.user) {
      return res.status(401).send("Kullanıcı bilgisi bulunamadı");
  }

  const token = jwt.sign(
    { type: req.user.type, _id: req.user._id }, // ✅ req.user üzerinden
    authSecretKey,
    { expiresIn: "1h" }
  );
       

  res.cookie("token", token, { httpOnly: true }); 
console.log("------1>"+token)

req.session.user = req.user;
return res.redirect("/redirect-by-type");
  
} catch (err) {
    console.error("authWho hatası:", err);
    res.redirect("/login");
}
};

 
exports.redirectByType = (req, res) => {

     
  try {
      const token = req.cookies.token;
      console.log("------------>"+token)
      if (!token) return res.redirect("/login");
      const decoded = jwt.verify(token, authSecretKey);
    
      if (decoded.type === 0) return res.redirect("/dashboard");
      if (decoded.type === 1) return res.redirect("/dashboard-teacher");
      if (decoded.type === 2) return res.redirect("/admin");
        
      
      return res.redirect("/login");
  } catch (err) {
      console.error("Token hatası:", err);
      res.redirect("/login");
  }
};