import { useState, useRef } from "react";
import QRCode from "react-qr-code";
import * as htmlToImage from "html-to-image";

function QrCodeGenerator() {
  const [url, setUrl] = useState("");
  const [qrIsVisible, setQrIsVisible] = useState(false);
  const handleQrCodeGenerator = () => {
    if (!url) {
      return;
    }
    setQrIsVisible(true);
  };

  const newQR = () => {
    setUrl("");
    setQrIsVisible(false);
  }

  const qrCodeRef = useRef(null);
  const downloadQRCode = () => {
    htmlToImage
      .toPng(qrCodeRef.current)
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "qr-code.png";
        link.click();
      })
      .catch(function (error) {
        console.error("Error generating QR code:", error);
      });
  };
  return (
    <div className="qrcode__container">
      <h1>QR Code Generator</h1>
      <div
        className="qrcode__container--parent"
        ref={qrCodeRef}
      >
        {!qrIsVisible ? (
          <div className="qrcode__input">
            <input
              type="text"
              placeholder="Enter a URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <button onClick={handleQrCodeGenerator}>Generate QR Code</button>
          </div>
        ) : (
          <div className="qrcode__download">
            <p className="pb-8">QRCode for {url}</p>
            <div className="qrcode__image">
              <QRCode
                value={url}
                size={300}
              />
            </div>
            <div className="spb">
                <button onClick={downloadQRCode}>Download QR Code</button>
                <button onClick={newQR}>Generate New QR</button>
            </div>          
          </div>
        )}
      </div>
    </div>
  );
}
export default QrCodeGenerator;
