'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../globals.css';
import Link from 'next/link';

const XenniumUseCases = () => {
  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="relative flex items-center justify-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] before:lg:h-[360px] z-[-1]">
        <h1 className="relative z-10 text-2xl font-bold text-gray-800 mb-4">Features of Xennium Coins</h1>
      </div>

      <div className="p-4 max-w-8xl w-full">
        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <p className="text-lg mb-6 font-normal">
            Xennium Coins are a unique digital currency where the last coin you possess becomes non-spendable. 
            This creates interesting dynamics for savings, gamification, and user engagement across various platforms.
          </p>
        </section>

        {/* Use Case 1: Gamification */} 
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">1. Gamification in Rewards Programs</h2>
          <p className="text-lg mb-6 font-normal">
            In rewards programs, users earn Xennium coins for completing tasks or purchases. The inability to spend the last coin creates a psychological attachment to the coins, encouraging users to earn more coins to avoid being unable to spend.
          </p>
        </section>

        {/* Use Case 2: Loyalty Programs */} 
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">2. Loyalty Programs</h2>
          <p className="text-lg mb-6 font-normal">
            Xennium coins can be used in loyalty programs where customers accumulate rewards but cannot spend their last coin. This incentivizes repeat engagement to avoid being left with unusable coins.
          </p>
        </section>

        {/* Use Case 3: Educational Value */} 
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">3. Educational Games on Financial Management</h2>
          <p className="text-lg mb-6 font-normal">
            Xennium coins teach users financial management by encouraging them to save while gradually spending. The non-spendable last coin demonstrates the importance of always keeping some assets in reserve.
          </p>
        </section>

        {/* Use Case 4: Psychological Impact */} 
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">4. Psychological Attachment</h2>
          <p className="text-lg mb-6 font-normal">
            The non-spendable last coin encourages users to retain their coins, fostering a sense of value. This unique dynamic can enhance user engagement and retention on any platform implementing Xennium coins.
          </p>
        </section>

        {/* Additional Use Case 1: Charity Donations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">5. Charity Donations and Cause Contributions</h2>
          <p className="text-lg mb-6 font-normal">
            Xennium coins could be used in charitable giving platforms. Users can donate their coins while the last coin remains with them, symbolizing an ongoing connection to the cause. This can create a sense of continuity, where users feel tied to the cause beyond their initial donation.
          </p>
        </section>

        {/* Additional Use Case 2: Digital Art Ownership */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">6. Digital Art and NFT Ownership</h2>
          <p className="text-lg mb-6 font-normal">
            Xennium coins could be integrated into NFT platforms, where users can spend most of their coins to acquire digital art, but the last coin stays with them, symbolizing their enduring membership or loyalty to the platform. It could also be tied to exclusive benefits for loyal users.
          </p>
        </section>

        {/* Additional Use Case 3: Subscription Models */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">7. Subscription Services and Memberships</h2>
          <p className="text-lg mb-6 font-normal">
            In subscription services, Xennium coins could serve as both payment and engagement tools. Users spend their coins on services, but the last coin remains unspent, symbolizing an ongoing membership. This creates a sense of investment, keeping users engaged with the platform.
          </p>
        </section>

        <div className="mt-6 text-center">
          <Link href="/about" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-600">
            Learn More
          </Link>
        </div>
      </div>
    </main>
  );
};

export default XenniumUseCases;
