'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../globals.css';
import Link from 'next/link';

const PrivacyPolicy = () => {
  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="relative flex items-center justify-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] before:lg:h-[360px] z-[-1]">
        <h1 className="relative z-10 text-2xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
      </div>
      <div className="p-4 max-w-8xl w-full">
        
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Introduction</h2>
          <p className="text-lg mb-6 font-normal">
            Welcome to Xenium. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you use our services. We are committed to safeguarding your privacy and ensuring the security of your personal data.
          </p>
          <p className="text-lg mb-6 font-normal">
            By using our services, you agree to the collection and use of information in accordance with this Privacy Policy. Please read this policy carefully to understand how we handle your personal data.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="text-lg mb-6 font-normal">
            We collect personal information that you provide directly to us when you register an account, use our services, or contact us. This information may include your name, email address, and other details necessary for the functionality of our platform.
          </p>
          <p className="text-lg mb-6 font-normal">
            In addition to the information you provide, we may automatically collect certain data when you interact with our services. This includes your IP address, browser type, and usage data, which helps us improve our services and customize your experience.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p className="text-lg mb-6 font-normal">
            The information we collect is used to provide, maintain, and improve our services. We may use your data to:
          </p>
          <ul className="list-disc list-inside text-lg mb-6 font-normal">
            <li>Facilitate account creation and management.</li>
            <li>Communicate with you, including sending you updates, notifications, and support-related messages.</li>
            <li>Analyze usage patterns to improve our services and develop new features.</li>
            <li>Ensure compliance with legal obligations and protect the rights, property, or safety of our users and our platform.</li>
          </ul>
          <p className="text-lg mb-6 font-normal">
            We will not use your personal information for purposes other than those outlined in this Privacy Policy without your consent.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">3. Sharing of Information</h2>
          <p className="text-lg mb-6 font-normal">
            We may share your personal information with third parties under certain circumstances, including:
          </p>
          <ul className="list-disc list-inside text-lg mb-6 font-normal">
            <li>With service providers who assist us in operating our platform, conducting business, or servicing you, provided that they agree to keep your information confidential.</li>
            <li>In response to legal requests, such as court orders or subpoenas, or in compliance with applicable laws and regulations.</li>
            <li>In the event of a merger, acquisition, or sale of all or a portion of our assets, where your information may be transferred as part of the transaction.</li>
          </ul>
          <p className="text-lg mb-6 font-normal">
            We do not sell your personal information to third parties. Any data shared with third parties will be done so with the utmost care and in accordance with this Privacy Policy.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">4. Security of Your Information</h2>
          <p className="text-lg mb-6 font-normal">
            We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the internet or method of electronic storage is completely secure.
          </p>
          <p className="text-lg mb-6 font-normal">
            While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security. You are responsible for maintaining the confidentiality of your account credentials and for any activities that occur under your account.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">5. Data Retention</h2>
          <p className="text-lg mb-6 font-normal">
            We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When your data is no longer needed, we will take steps to delete or anonymize it.
          </p>
          <p className="text-lg mb-6 font-normal">
            You may request the deletion of your personal data at any time, and we will comply with your request unless we are required to retain certain information for legal or legitimate business purposes.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">6. Changes to This Privacy Policy</h2>
          <p className="text-lg mb-6 font-normal">
            We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any changes will be posted on this page, and the "Last Updated" date will be revised accordingly.
          </p>
          <p className="text-lg mb-6 font-normal">
            We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information. Your continued use of our services after any changes to this policy will constitute your acceptance of the updated terms.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">7. Contact Us</h2>
          <p className="text-lg mb-6 font-normal">
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at <a href="mailto:support@example.com" className="text-black underline">support@example.com</a>. We are here to assist you and address any issues you may have.
          </p>
          <p className="text-lg mb-6 font-normal">
            Your privacy is important to us, and we are committed to ensuring that your personal information is handled responsibly and securely.
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

export default PrivacyPolicy;
