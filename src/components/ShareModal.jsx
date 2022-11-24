import React from "react";
import {
  FaFacebook,
  FaLinkedin,
  FaReddit,
  FaTelegram,
  FaTumblr,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
const ShareModal = ({ URL, TYPE }) => {
  return (
    <div className="border shadow-lg hover:drop-shadow-xl p-4 rounded-lg bg-white md:w-[400px] w-[280px]">
      <div className="flex flex-row items-center justify-center text-lg font-medium">
        {TYPE === "GROUP"
          ? "Invite your friends to join the group"
          : "Invite your friends to join Anshyati"}
        
      </div>
      <div className="flex flex-col items-center justify-center text-lg font-medium mt-8">
        <div className="flex flex-row items-center justify-center">
          <EmailShareButton
            subject={
              TYPE === "GROUP" ? "Join Anshyati Group" : "Join me on Anshyati"
            }
            body={
              TYPE === "GROUP"
                ? "Follow this link to join my Anshyati group: "
                : "Follow this link to join me on Anshyati"
            }
            url={URL}
          >
            <div className="bg-white rounded-full p-2 cursor-pointer m-2 shadow-md hover:drop-shadow-lg  ">
              <MdEmail />
            </div>
          </EmailShareButton>
          <FacebookShareButton
            hashtag={["#anshyati", "#groups", "#split_the_bill"]}
            body={
              TYPE === "GROUP"
                ? "Follow this link to join my Anshyati group: "
                : "Follow this link to join me on Anshyati"
            }
            url={URL}
          >
            <div className="bg-white rounded-full p-2 cursor-pointer m-2 shadow-md hover:drop-shadow-lg  ">
              <FaFacebook />
            </div>
          </FacebookShareButton>
          <LinkedinShareButton
            title="Join Anshyati Group"
            summary={
              TYPE === "GROUP" ? "Join Anshyati Group" : "Join me on Anshyati"
            }
            source="https://anshyati.vercel.com"
            url={URL}
          >
            <div className="bg-white rounded-full p-2 cursor-pointer m-2 shadow-md hover:drop-shadow-lg  ">
              <FaLinkedin />
            </div>
          </LinkedinShareButton>
          <WhatsappShareButton
            title={
              TYPE === "GROUP"
                ? "Follow this link to join my Anshyati group: "
                : "Follow this link to join me on Anshyati"
            }
            separator=":"
            url={URL}
          >
            <div className="bg-white rounded-full p-2 cursor-pointer m-2 shadow-md hover:drop-shadow-lg  ">
              <FaWhatsapp />
            </div>
          </WhatsappShareButton>
        </div>
        <div className="flex flex-row items-center justify-center">
          <TelegramShareButton
            title={
              TYPE === "GROUP" ? "Join Anshyati Group" : "Join me on Anshyati"
            }
            url={URL}
          >
            <div className="bg-white rounded-full p-2 cursor-pointer m-2 shadow-md hover:drop-shadow-lg  ">
              <FaTelegram />
            </div>
          </TelegramShareButton>
          <TumblrShareButton
            caption={
              TYPE === "GROUP"
                ? "Follow this link to join my Anshyati group: "
                : "Follow this link to join me on Anshyati"
            }
            tags={["anshyati", "groups", "split_the_bill"]}
            title={
              TYPE === "GROUP" ? "Join Anshyati Group" : "Join me on Anshyati"
            }
            url={URL}
          >
            <div className="bg-white rounded-full p-2 cursor-pointer m-2 shadow-md hover:drop-shadow-lg  ">
              <FaTumblr />
            </div>
          </TumblrShareButton>
          <TwitterShareButton
            hashtags={["anshyati", "groups", "split_the_bill"]}
            title={
              TYPE === "GROUP" ? "Join Anshyati Group" : "Join me on Anshyati"
            }
            url={URL}
          >
            <div className="bg-white rounded-full p-2 cursor-pointer m-2 shadow-md hover:drop-shadow-lg  ">
              <FaTwitter />
            </div>
          </TwitterShareButton>
          <RedditShareButton
            title={
              TYPE === "GROUP" ? "Join Anshyati Group" : "Join me on Anshyati"
            }
            url={URL}
          >
            <div className="bg-white rounded-full p-2 cursor-pointer m-2 shadow-md hover:drop-shadow-lg  ">
              <FaReddit />
            </div>
          </RedditShareButton>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center text-md rounded-lg shadow-md hover:drop-shadow-lg border mt-4 p-2">
        <div className="overflow-x-auto outlet ">{URL}</div>
        <div
          className="bg-gray-300 rounded-lg p-2 cursor-pointer ml-2 shadow-md hover:drop-shadow-lg  "
          onClick={() => navigator.clipboard.writeText(URL)}
        >
          Copy
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
