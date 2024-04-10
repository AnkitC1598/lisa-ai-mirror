import { getUser } from "@/actions/user"
import icon from "@/app/favicon.ico"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"

const ProfileLink = async () => {
	const user = await getUser()

	return (
		<>
			<Button
				variant="link"
				asChild
			>
				<Link
					href="/profile"
					className="relative aspect-square h-8 overflow-hidden rounded-full border border-gray-400 !p-0"
				>
					<Image
						src={user.profileImage ?? icon}
						alt={user.fullname}
						fill
					/>
				</Link>
			</Button>
		</>
	)
}

export default ProfileLink
