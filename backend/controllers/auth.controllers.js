import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenandSetCookie from "../utils/generateToken.js";
export const signup = async(req,res)=>{
    try {
        const { fullName, username, password, confirmpassword, gender } = req.body;
        if(password!==confirmpassword){
            return res.status(400).json({error:"Passwords don't match!"});
        }
        const user = await User.findOne({username});
        if(user) {
            return res.status(400).json({error:"Username already Exists!"})
        }
        const boyprofilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlprofilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender==='male'? boyprofilePic : girlprofilePic
        })
        if(newUser){
            // generate jwt token and set it into cookie
            generateTokenandSetCookie(newUser._id,res);
            await newUser.save();
            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({error:"Invalid user data"});
        }

    } catch (error) {
        console.log("error in signup controller",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const login = async(req,res)=>{
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if(!user || !isPasswordCorrect){
            res.status(400).json({error:"Invalid username or Password"});
        }
        generateTokenandSetCookie(user._id,res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.log("error in login controller",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}
export const logout = (req,res)=>{
    try {
        res.cookie("jwt","",{
            maxAge:0
        });
        res.status(200).json({error:"Logged out successfully!"})
    } catch (error) {
        console.log("error in logout controller",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}