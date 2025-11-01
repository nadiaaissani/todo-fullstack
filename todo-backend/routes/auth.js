import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// INSCRIPTION
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (await User.findOne({ email })) return res.status(400).send("Email déjà existant");

    const user = new User({
        name,
        email,
        password: await bcrypt.hash(password, 10)
    });

    await user.save();
    res.send("Utilisateur créé !");
});

// CONNEXION
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Utilisateur non trouvé");

    if (!(await bcrypt.compare(password, user.password)))
        return res.status(400).send("Mot de passe incorrect");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
});

export default router;
