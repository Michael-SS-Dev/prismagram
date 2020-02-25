import "./env";
import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "michael.ss.dev@prismagram.com",
    to: address,
    subject: "🔒Login Secret for Prismagram🔒",
    html: `Hello! Your login secret is <b>${secret}</b><br/>Copy paste on the app/website to log in`
  };
  return sendMail(email);
};

// 토큰을 만들어내는 함수 yarn add jsonwebtoken으로 설치 후 사용
// 현재는 암호화 하는 것이라고 볼 수 있는데, 복호화와 암호화 시 같은 키 사용
export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
