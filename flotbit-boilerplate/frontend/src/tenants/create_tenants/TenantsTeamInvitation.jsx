import React, { useState } from "react";
import Navbar from "../../common/components/Navbar";
import { BackArrow, InfoOutline } from "../../assets/icons/svgs";
import { Link2 } from "lucide-react"; // for the link icon
import { Button } from "../../common/components/ui/button";
import { LinkIcon } from "../../assets/icons/TenantSVGs";

export default function WorkspaceStep3({ defaultValue, formData, onBack, onComplete }) {
    const [emails, setEmails] = useState("");

    const handleDone = () => {
        onComplete(emails.split(",").map((e) => e.trim()));
    };

    //need to handle tenant invitations link

    // const handleCopyLink = () => {
    //     navigator.clipboard.writeText("https://floapp.com/invite/your-link");
    //     alert("Invitation link copied!");
    // };

    return (
        <div
            className="flex w-full flex-col min-h-screen overflow-hidden  width-full
                 bg-[#F8F8F8] text-[#000000]" style={{ width: "100%" }}
        >
            {/* Navbar */}
            <Navbar
                leftNav={{
                    icon: <BackArrow height={"17px"} fill={"var(--form-primary-color)"} />,
                    onClick: onBack
                }}
                navText={"New Workspace"}
                rightNav={{
                    icon:
                        <InfoOutline height={"30px"} fill={"var(--form-primary-color)"} />
                }}
            />

            {/* Content */}
            <div className="px-6 py-6 flex flex-col">
                <p className="text-sm text-gray-500 mb-3 font-[SF Pro]">Step 3 to 3</p>

                {/* Title */}
                <h2
                    className="mb-3 break-words"
                    style={{
                        maxWidth: "100%",   // span full width
                        fontFamily: "SF Pro, sans-serif",
                        fontWeight: 700,
                        fontSize: "24px",
                        lineHeight: "130%", // give space between lines
                        letterSpacing: "0px",
                        minWidth: "75%",    // optional, can remove
                    }}
                >
                    Who else is on the{" "}
                    <span style={{ color: "#2B4CB9" }}>{formData.workspaceName}</span> tenant?
                </h2>

                {/* Description */}
                <p
                    className="mb-6 text-gray-500"
                    style={{
                        fontFamily: "SF Pro, sans-serif",
                        fontWeight: 400,
                        fontSize: "13px",
                        lineHeight: "100%",
                        letterSpacing: "0px",
                    }}
                >
                    Help your teammate to that you’re talking <br /> to the right person
                </p>

                {/* Add colleagues by email label */}
                <p
                    className="text-gray-600 mb-3"
                    style={{
                        fontFamily: "SF Pro, sans-serif",
                        fontWeight: 590,   // custom weight
                        fontSize: "13px",
                        lineHeight: "100%",
                        letterSpacing: "0px",
                        fontStyle: "normal", // Semibold falls under weight, not style
                    }}
                >
                    add colleagues by email
                </p>


                {/* Email Textarea */}
                <textarea
                    value={emails}
                    onChange={(e) => setEmails(e.target.value)}
                    placeholder="Example elss@gmail.com, maria@gmail.com"
                    className="w-full px-4 py-3 rounded-2xl text-gray-700 
                     bg-[#F8F8F8]
                     shadow-[-10px_-10px_16px_0px_#FFFFFF,10px_10px_20px_0px_#D2D2D2]
                     focus:outline-none focus:ring-2 focus:ring-[#3B4F7D] 
                     mb-6"
                    rows={3}
                    style={{
                        fontFamily: "SF Pro, sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "300%",
                    }}
                />

                {/* Done Button */}
                <Button
                    variant="primary"
                    label={"Done"}
                    className={"w-full mt-8"}
                    onclick={handleDone}
                    type="submit"
                />

                {/* Copy Invitation Link */}
                <button
                    // onClick={handleCopyLink}
                    className="mt-5 flex items-center justify-center gap-2 text-[#2B4CB9] 
                     text-sm font-medium"
                    style={{
                        fontFamily: "SF Pro, sans-serif",
                        fontWeight: 510,
                        fontSize: "14px",
                        style: "medium",
                        color: "#3A4E7C",
                    }}
                >
                    <LinkIcon size={16} /> Copy invitation link
                </button>

            </div>
        </div>
    );
}
