import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/authContext";
const MessageContainer = () => {
	const {selectedConversation, setSelectedConversation} = useConversation();

	useEffect(() => {
	  return()=> setSelectedConversation(null)
	}, [setSelectedConversation]);
	
	return (
		<div className='flex flex-col w-full'>
            {!selectedConversation ? (
                <NoChatSelected/>
            ):(
                <>
				{/* Header */}
				<div className='bg-gray-800/70 px-4 py-2 mb-2'>
					<span className='label-text'>To:</span> <span className='font-bold'>{selectedConversation.fullName}</span>
				</div>

				<Messages />
				<MessageInput />
				</>
            )}
			
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome {authUser.fullName} ☃️❄️</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};
