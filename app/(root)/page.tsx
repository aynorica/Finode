import HeaderBox from "@/components/HeaderBox";
import RecentTransactions from "@/components/RecentTransactions";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
	const currentPage = +page! || 1;
	const loggedIn = await getLoggedInUser();
	const accounts = await getAccounts({ userId: loggedIn?.$id });
	if (!accounts) return null;
	const accountsData = accounts?.data;
	const appwriteItemId = (id as string) || accountsData[0].appwriteItemId;
	const account = await getAccount({ appwriteItemId });
	console.log("account", account.transactions);
	return (
		<section className="home">
			<div className="home-content">
				<header className="home-header">
					<HeaderBox
						title="Welcome"
						subtext="Access and manage your account and transactions efficiently."
						user={
							`${loggedIn.firstName} ${loggedIn.lastName}` ||
							"Guest"
						}
						type="greeting"
					/>
					<TotalBalanceBox
						accounts={accountsData}
						totalBanks={accounts.totalBanks}
						totalCurrentBalance={accounts.totalCurrentBalance}
					/>
				</header>
				<RecentTransactions
					accounts={accountsData}
					appwriteItemId={appwriteItemId}
					transactions={account.transactions}
					page={currentPage}
				/>
			</div>
			<RightSidebar
				user={loggedIn}
				banks={accountsData.slice(0, 2)}
				transactions={account?.transactions}
			/>
		</section>
	);
};

export default Home;
