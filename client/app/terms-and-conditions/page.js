'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../globals.css';
import Link from 'next/link';

const TermsAndConditions = () => {
  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="relative flex items-center justify-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1 className="relative z-10 text-2xl font-bold text-gray-800 mb-4">Terms and Conditions</h1>
      </div>
      <div className="p-4 max-w-8xl w-full">
        
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Introduction</h2>
          <p className="text-lg mb-6 font-normal">
            Welcome to Xennium! By accessing or using our website and services, you agree to comply with these Terms and Conditions. We encourage you to read them carefully to understand your rights and responsibilities when using our platform.
          </p>
          <p className="text-lg mb-6 font-normal">
            These terms apply to all users of Xennium, including but not limited to visitors, registered users, and others who access the site. If you do not agree with any part of these terms, you should refrain from using our services.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">1. Age Requirement</h2>
          <p className="text-lg mb-6 font-normal">
            You must be at least 18 years old to use our services. We take the age requirement seriously to ensure that our platform is used responsibly. If you are under 18, you are strictly prohibited from registering, using our services, or providing any personal information to us.
          </p>
          <p className="text-lg mb-6 font-normal">
            By using our site, you confirm that you are 18 years of age or older and that you have the legal capacity to enter into this agreement. If we discover that a user is under the age of 18, we reserve the right to terminate their account immediately.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">2. User Accounts</h2>
          <p className="text-lg mb-6 font-normal">
            When you create an account on Xennium, you agree to provide accurate and complete information about yourself. You are responsible for maintaining the confidentiality of your account credentials, including your username and password, and for all activities that occur under your account.
          </p>
          <p className="text-lg mb-6 font-normal">
            You agree to notify us immediately of any unauthorized access or use of your account. We are not liable for any loss or damage resulting from your failure to protect your account information. It is your responsibility to ensure the security of your account and to change your password periodically.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">3. Financial Transactions</h2>
          <p className="text-lg mb-6 font-normal">
            All financial transactions conducted through our site, including but not limited to the purchase of Xennium coins, are subject to applicable laws and regulations. By engaging in any financial transactions on our platform, you agree to comply with all relevant legal requirements and to ensure that you are legally permitted to engage in such transactions.
          </p>
          <p className="text-lg mb-6 font-normal">
            You understand that you are responsible for any fees, taxes, or other charges that may apply to your transactions. Xennium is not responsible for any errors or delays in processing your transactions due to circumstances beyond our control.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">4. Privacy Policy</h2>
          <p className="text-lg mb-6 font-normal">
            We respect your privacy and are committed to protecting your personal information. Our <Link href="/privacy-policy" className="text-black underline">Privacy Policy</Link> outlines how we collect, use, and share your data. By using our services, you agree to the terms of our Privacy Policy.
          </p>
          <p className="text-lg mb-6 font-normal">
            We may update our Privacy Policy from time to time, and we encourage you to review it periodically. Your continued use of our site constitutes your acceptance of any changes to the Privacy Policy.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">5. Limitation of Liability</h2>
          <p className="text-lg mb-6 font-normal">
            To the fullest extent permitted by law, Xennium and its affiliates, officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our site or services. This limitation of liability applies regardless of the legal theory under which such damages are sought.
          </p>
          <p className="text-lg mb-6 font-normal">
            Xennium's total liability for any claim arising out of or relating to these terms or your use of our services shall not exceed the amount you paid to us, if any, in the 12 months preceding the event giving rise to the claim. Some jurisdictions do not allow the exclusion or limitation of certain damages, so the above limitations may not apply to you.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">6. Changes to Terms</h2>
          <p className="text-lg mb-6 font-normal">
            We reserve the right to modify these Terms and Conditions at any time. Any changes will be effective immediately upon posting on this page. It is your responsibility to review these terms periodically for updates.
          </p>
          <p className="text-lg mb-6 font-normal">
            Your continued use of the site following the posting of any changes to these terms constitutes your acceptance of those changes. If you do not agree with the revised terms, you must stop using our services immediately.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">7. Contact Us</h2>
          <p className="text-lg mb-6 font-normal">
            If you have any questions or concerns about these Terms and Conditions, please feel free to reach out to us at <a href="mailto:support@example.com" className="text-black underline">support@example.com</a>. We are here to assist you and address any issues you may have.
          </p>
          <p className="text-lg mb-6 font-normal">
            Your feedback is important to us, and we are committed to ensuring a positive experience on Xennium. Please do not hesitate to contact us with any inquiries or suggestions.
          </p>
        </section>

        <div className="mt-6 text-center">
          <Link href="/register" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-600">
            Back
          </Link>
        </div>
      </div>
    </main>
  );
};

export default TermsAndConditions;
