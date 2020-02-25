// dotenv를 한가지 import만으로 유니버셜하게 쓰기 위한 js파일
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });
