import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

export default function SendMessage({ visible, onClosed }) {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSend = () => {
        // Perform send operation here
        console.log("Subject:", subject);
        console.log("Message:", message);
    };

    if (!visible) return null;

    const handleOnClosed = () => {
        onClosed();
    };

    return (
        <>
            {visible && (
                <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 px-8">
                    <div className="bg-white  rounded-lg p-4 w-[820px] ">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Compose Message</h3>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={handleOnClosed}
                            >
                                <AiFillCloseCircle size={20} />
                            </button>
                        </div>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="subject" className="block mb-1 font-medium">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="form-input p-2 border rounded-lg w-full focus:border-black"
                                    placeholder="Enter subject"
                                    value={subject}
                                    onChange={handleSubjectChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block mb-1 font-medium">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    className="form-textarea p-2 border rounded-lg w-full focus:border-black resize-none"
                                    rows={4}
                                    placeholder="Enter message"
                                    value={message}
                                    onChange={handleMessageChange}
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
                                    onClick={handleSend}
                                >
                                    Send
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
