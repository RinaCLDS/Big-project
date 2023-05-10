
const characters = '0123456789';

const generateOTP = (length) => {
    let otp = '';
  
    for (let i = 0; i < length; i++) {
      otp += characters[Math.floor(Math.random() * 10)];
      if(i == 2) {
        otp += ' ';
      }
    }
  
    return otp;
  }
  
  const otp = generateOTP(6);
  
  console.log(otp);
  console.log(Math.floor(3.4));
  