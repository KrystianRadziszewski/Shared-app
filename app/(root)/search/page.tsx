import { fetchUser, fetchUserPosts, fetchUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import UserCard from '@/components/cards/UserCard';

async function Page() {
	const user = await currentUser();
	console.log(`...(root)/profile -> user: ${user}`);
	if (!user) return null;

	const userInfo = await fetchUser(user.id);
	console.log(`...(root)/profile -> UserInfro: ${userInfo}`);
	if (!userInfo?.onboarded) {
		redirect('/onboarding');
	}

	//Fetch users

	const result = await fetchUsers({
		userId: user.id,
		searchString: '',
		pageNumber: 1,
		pageSize: 25,
	});

	console.log(`..app/(root)/search --> result: ${result}`);

	return (
		<section>
			<h1 className="head-text mb-10">Search</h1>

			{/* Search Bar */}

			<div className="mt-14 flex flex-col gap-9">
				{result.users.length === 0 ? (
					<p className="no-result">No users</p>
				) : (
					<>
						{result.users.map((person) => (
							<UserCard key={person.id} id={person.id} name={person.name} username={person.username} imgUrl={person.image} personType="User" />
						))}
					</>
				)}
			</div>
		</section>
	);
}

export default Page;
