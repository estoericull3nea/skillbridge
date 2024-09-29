import React, { useEffect } from 'react'
const Terms = () => {
  useEffect(() => {
    document.title = 'Terms & Conditions'
  }, [])
  return (
    <>
      <div className='max-w-[600px] mx-auto'>
        <h1 className='font-semibold text-3xl tracking-normal mt-16 mb-10'>
          Terms of Service
        </h1>

        <div className='intro space-y-4'>
          <h2 className='font-medium text-2xl'>
            User's Acknowledgment and Acceptance of Terms
          </h2>
          <p className='text-sm leading-relaxed'>
            Welcome to Skill Bridge Agency!
          </p>
          <p className='text-sm leading-relaxed'>
            "Skill Bridge ("We" or "Us") offers the website
            https://skillbridgevirtualcareers.com and various related services,
            including any content, features, and functions provided on or
            through https://skillbridgevirtualcareers.com (referred to as the
            "site" and collectively, the "services"). Your use of the site and
            services is subject to your compliance with all the terms,
            conditions, and notices outlined in this agreement (referred to as
            the "Terms of Service"), as well as any other written agreements
            between you and Skill Bridge. Additionally, when accessing specific
            services or materials on the site, users are bound by any posted
            rules applicable to those services or materials, which may include
            additional terms and conditions beyond those stated in this
            agreement. All such guidelines or rules are hereby incorporated into
            these Terms of Service by reference."
          </p>
          <p className='text-sm leading-relaxed'>
            By using this site, you agree to follow these Terms of Service. If
            you don't want to follow these terms, please leave the site now. If
            you're not happy with this site, its products, services, content, or
            any other information available here, your only option is to stop
            using the site and/or those specific products or services. Your
            agreement with us to follow these terms starts as soon as you begin
            using this site.
          </p>
        </div>

        <div className='types space-y-4 my-6'>
          <h2 className='font-medium text-2xl'>Service Overview</h2>
          <p className='text-sm leading-relaxed'>
            To maintain the quality of the Skill Bridge experience, we have
            established our terms of service for the benefit of both parties.
            Violation of these rules constitutes a breach of the terms of
            service and may result in the termination of your account.
          </p>
          <p className='text-sm leading-relaxed'>
            Any agreement or attempted agreement between a client and an
            assistant, in relation to a service contract, which stipulates that
            payment should be made outside of Skill Bridge, will be considered a
            significant violation of this agreement. Such breaches are subject
            to cancellation without refund.
          </p>

          <p className='text-sm leading-relaxed'>
            The services are exclusively accessible to users who have attained
            the legal age of majority in their respective jurisdictions. These
            services are not intended for, and should not be accessed or
            utilized by individuals under the age of 18 or those residing
            outside of the United States. By using the services, you confirm
            that you meet the eligibility criteria outlined herein. If you fail
            to meet all the requirements, even though you're undoubtedly an
            exceptional individual, you must refrain from accessing or using the
            services.
          </p>
        </div>

        <div className='types space-y-4 my-6'>
          <h2 className='font-medium text-2xl'>Requests & Tasks</h2>
          <p className='text-sm leading-relaxed'>
            Each task submission must be done individually via phone, email, or
            SMS. We require that each communication with your assistant focuses
            on a single, clearly defined task. While we encourage you to submit
            multiple tasks at once, we kindly ask that you create a separate
            email for each task. This practice ensures optimal efficiency in
            completing your requests promptly.
          </p>
          <p className='text-sm leading-relaxed'>
            Should you ever feel that our service can be enhanced, please feel
            free to reach out to us by email at
            skillbridgeinfoservices@gmail.com. To better understand the tasks we
            handle and those we do not, please consult our "What We Do" page.
            This resource will provide you with a comprehensive overview of our
            capabilities and limitations. By agreeing to these terms of service,
            you affirm your understanding and commitment to align your requests
            with our business scope.
          </p>
        </div>

        <div className='purpose space-y-4 my-6'>
          <h2 className='font-medium text-2xl'>Guarantee & Warranty</h2>
          <p className='text-sm leading-relaxed'>
            While we strive to offer the most accurate and effective information
            possible, there is no warranty on any of the information, tasks, or
            projects completed by your Virtual Assistant. We are committed to
            providing high-quality assistance, as we believe Virtual Assistants
            excel in this regard. However, if any information or results
            provided are incorrect, we regretfully cannot be held legally or
            morally liable for them. We sincerely apologize for any
            inconvenience this may cause.
          </p>
        </div>

        <div className='data_protection space-y-4 my-6'>
          <h2 className='font-medium text-2xl'>
            Third Party Sites and Content
          </h2>
          <p className='text-sm leading-relaxed'>
            The services may include features or options that allow you to
            access or link to other websites, applications, or resources on the
            Internet, and vice versa. However, it's important to note that these
            external websites are beyond our control, and we cannot be held
            responsible for any third-party content, products, or services,
            including their accuracy, integrity, quality, legality, safety, or
            intellectual property rights. Our inclusion of any such links does
            not imply endorsement or association with the operators of these
            external websites.
          </p>
          <p className='text-sm leading-relaxed'>
            You acknowledge and agree that we are not liable for any damage or
            loss arising from the use of or reliance on third-party content,
            goods, or services available through the services or any linked
            websites or resources. Accessing and using third-party sites,
            including any information, materials, products, and services they
            offer, is solely at your own risk.
          </p>
        </div>

        <div className='user_rights space-y-4 my-6'>
          <h2 className='font-medium text-2xl'>Limitation of Liability</h2>
          <p className='text-sm leading-relaxed'>
            We reserve the right to cooperate fully with law enforcement
            authorities or court orders requesting or directing us to disclose
            the identity or other information of anyone posting any content or
            other materials on or through the services. You waive and hold
            harmless us and our affiliates from any claims resulting from any
            action taken by any of the foregoing parties during or as a
            consequence of investigations by such parties or law enforcement
            authorities.
          </p>
          <p className='text-sm leading-relaxed'>
            You also agree to indemnify, defend, and hold harmless us and our
            affiliates from and against any loss, damage, cost, or liability
            (including reasonable attorneys' fees) resulting from or relating in
            any way to any claim, demand, action, or proceeding arising out of
            or relating to these Terms of Service, the services, or any content,
            including but not limited to your use, misuse, or connection to the
            services, your breach of the terms of service, your violation of any
            rights, your violation of any laws, or your use or exploitation of
            the services.
          </p>
          <p className='text-sm leading-relaxed'>
            We reserve the right, at your expense, to assume the exclusive
            defense and control of any matter for which you are required to
            indemnify us, and you agree to cooperate with our defense of these
            claims. You agree not to settle any matter without our prior written
            consent. We will make reasonable efforts to notify you of any such
            claim, action, or proceeding upon becoming aware of it. These Terms
            of Service shall not create any third-party beneficiary rights.
          </p>
        </div>

        <div className='cookies space-y-4 mb-3'>
          <h2 className='font-medium text-2xl'>Miscellaneous</h2>
          <p className='text-sm leading-relaxed'>
            By providing us with your email address, you consent to receive all
            necessary notices electronically at that email address. You are
            responsible for maintaining and updating your email address as
            needed.
          </p>

          <p className='text-sm leading-relaxed'>
            We collect this information to better understand your needs, provide
            you with the services you request, improve our products and
            services, and communicate with you effectively.
          </p>
        </div>

        <p className='text-sm leading-relaxed text-gray-400 font-light mb-3'>
          Latest update: 9th of February, 2024
        </p>
      </div>
    </>
  )
}

export default Terms
