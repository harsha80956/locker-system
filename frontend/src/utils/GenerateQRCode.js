import QRCode from "qrcode";

export const generateQR = async (text) => {
  try {
    let url = await QRCode.toDataURL(text);
    return url;
  } catch (err) {
    console.error(err);
    return null;
  }
};
