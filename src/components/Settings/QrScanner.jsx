import React, { useState } from "react";
import QrReader from "react-qr-scanner";
import { toast } from "react-toastify";

const QrScanner = ({ handleCloseModal2 }) => {
  const [data, setData] = useState("");
  const previewStyle = {
    height: 240,
    width: 280,
    borderRadius: "20px",
  };
  // HANDLE ERROR FUNCTION
  function handleError() {
    handleCloseModal2();
    toast.error("Something went wrong");
  }
  // HANDLE SCAN FUNCTION
  function handleScan(val) {
    setData(val);
    if (data && data?.length !== 0) {
      console.log("Scanning Done...");
      window.location.href = data.text;
      handleCloseModal2();
    }
    console.log("Scanning...");
  }
  return (
    <div className="p-4 flex flex-col items-center justify-center">
      {/* RENDERING TITLE */}
      <div className="flex  items-center justify-center text-lg mb-4 mt-2 font-semibold">
        SCAN QR CODE
      </div>
      {/* RENDERING QR SCANNER */}
      <QrReader
        delay={500}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
      {/* RENDERING ALERTS */}
      {!data && (
        <p className="flex  items-center justify-center mt-4 text-lg font-medium">
          Scanning......
        </p>
      )}
    </div>
  );
};

export default QrScanner;
