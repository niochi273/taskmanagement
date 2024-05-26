import { commitLogout } from "@/app/lib/auth";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { montserrat, open_sans } from "@/app/ui/fonts";

export default function ProfileHeader({ username }: { username: string }) {
	const router = useRouter()

	const logout = async () => {
		await commitLogout();
		localStorage.removeItem('accessToken');
		router.replace("/");
	};

	return (
		<section className="flex flex-row items-center border border-lightgray rounded-lg p-4 px-6 h-40 mb-5">
			<Image className="hidden md:block rounded-full mr-3" src='/default-pfp.png' alt="default profile picture" width={100} height={100} />
			<div className="flex flex-col gap-5 items-start">
				<div className={`font-semibold text-3xl ${montserrat.className}`}>{username}</div>
				<button onClick={logout} className={`text-lg hover:text-blue-500 transition-colors ${open_sans.className}`}><i className="ri-logout-box-r-line"></i> Sign Out</button>
			</div>
		</section>
	)
}