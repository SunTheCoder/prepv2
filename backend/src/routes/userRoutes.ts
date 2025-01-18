import express, { Response, Request, NextFunction } from "express";
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"
import User from "../../models/user"

const router = express.Router()

router.post("/signup", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log("Received Data:", req.body); // ✅ Log input for debugging

        const { name, username, email, password } = req.body

        if (!name || !username || !email || !password ) {
            res.status(400).json({
                error: "All fields are required."
            });
            return;
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            username,
            email,
            password: hashedpassword
        })

        res.status(200).json({message: "User created successfully", user: newUser})

    } catch (error) {

        next(error)

    }
})

router.post("/login", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({message: "All fields are required."});
        }

        const user = await User.findOne({where: { username }})

        if (!user) {
            res.status(400).json({message: "User not found."});
            return;
        }

        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            res.status(400).json({error: "Invalid credentials"});
            return;
        }

        const token = JWT.sign({ is: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

        res.cookie("token", token, {httpOnly: true, secure: true, sameSite: "strict"});
        res.status(200).json({message: "Logged in successfully."});

    } catch (error) {

        next(error);

    }
})

router.post("/logout", async (req: Request, res: Response): Promise<void> => {
    res.clearCookie("token");
    res.json({message: "Logged out successfuly."});
});

router.get("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const users = await User.findAll()
        res.json(users)

    } catch (error) {

        next(error)
    }
})

router.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params

        if (!id) {
            res.status(400).json({message: "No Id recieved."});
            return;
        }

        const user = await User.findOne({ where: { id } })

        if (!user) {
            res.status(404).json({message: "User not found."});
            return;
        }

        res.json(user)

    } catch (error) {

        next(error)

    }
})

router.put("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, username, bio } = req.body
        const { id } = req.params;

        if (!id) {
            res.status(400).json({message: "No Id Found"});
            return;
        }

        const user = await User.findOne({ where: {id}});

        if (!user) {
            res.status(404).json({message: "User not found."});
            return;
        }

        await user.update({name, username, bio})
        res.json({message: "User updated successfully.", user })

    } catch (error) {

        next(error)

    }
})

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({message: "No Id Found"});
            return;
        }

        const user = await User.findOne({ where: {id}});

        if (!user) {
            res.status(404).json({message: "User not found."});
            return;
        }

        await user.destroy();
        res.json({message: "User deleted successfully"})

    } catch (error) {

    }
})

export default router