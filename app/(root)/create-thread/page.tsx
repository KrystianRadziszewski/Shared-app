import PostThread from '@/components/forms/PostThread';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

async function Page() {
	const user = await currentUser();
	console.log(`...(root)/create-thread -> user: ${user}`);

	if (!user) return null;

	const userInfo = await fetchUser(user.id);
	console.log(`...(root)/create-thread -> UserInfro: ${userInfo}`);

	if (!userInfo?.onboarded) {
		redirect('/onboarding');
	}

	return (
		<>
			<h1 className=" head-text">Create Thread</h1>

			<PostThread userId={userInfo._id} />
		</>
	);
}

export default Page;
