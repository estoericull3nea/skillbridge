import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
const Policy = () => {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = t('PrivacyPolicy')
  }, [])
  return (
    <>
      <div className='max-w-[600px] mx-auto'>
        <h1 className='font-semibold text-3xl tracking-normal mt-16 mb-10'>
          {t('PrivacyPolicy')}
        </h1>

        <div className='intro space-y-4'>
          <h2 className='font-medium text-2xl'>{t('Introduction')}</h2>
          <p className='text-sm leading-relaxed'>{t('WelcomeMessage')}</p>
          <p className='text-sm leading-relaxed'>{t('PrivacyCommitment')}</p>
          <p className='text-sm leading-relaxed'>{t('TransparencyMessage')}</p>
          <p className='text-sm leading-relaxed'>
            {t('QuestionsConcernsMessage')}
          </p>
        </div>

        <div className='types space-y-4 my-6'>
          <h2 className='font-medium text-2xl'>
            {t('TypesOfInformationCollected')}
          </h2>
          <p className='text-sm leading-relaxed'>
            {t('AtSkillBridgeMarketingAgency')}
          </p>
          <p className='text-sm leading-relaxed'>
            <span className='font-semibold tracking-wide text-lg'>
              {t('PersonalInformation')}
            </span>
            <br />
            <span className='block mt-3'>
              {t('PersonalInformationDescription')}
            </span>
          </p>
          <p className='text-sm leading-relaxed'>
            <span className='font-semibold tracking-wide text-lg'>
              {t('BillingInformation')}
            </span>
            <br />
            <span className='block mt-3'>
              {t('BillingInformationDescription')}
            </span>
          </p>
          <p className='text-sm leading-relaxed'>
            <span className='font-semibold tracking-wide text-lg'>
              {t('UsageData')}
            </span>
            <br />
            <span className='block mt-3'>{t('UsageDataDescription')}</span>
          </p>
          <p className='text-sm leading-relaxed'>
            <span className='font-semibold tracking-wide text-lg'>
              {t('DeviceBrowserInformation')}
            </span>
            <br />
            <span className='block mt-3'>
              {t('DeviceBrowserInformationDescription')}
            </span>
          </p>
          <p className='text-sm leading-relaxed'>
            <span className='font-semibold tracking-wide text-lg'>
              {t('CookiesTrackingTechnologies')}
            </span>
            <br />
            <span className='block mt-3'>
              {t('CookiesTrackingTechnologiesDescription')}
            </span>
          </p>
          <p className='text-sm leading-relaxed'>
            <span className='font-semibold tracking-wide text-lg'>
              {t('FeedbackAndCommunications')}
            </span>
            <br />
            <span className='block mt-3'>
              {t('FeedbackAndCommunicationsDescription')}
            </span>
          </p>
        </div>

        <div className='types space-y-4 my-6'>
          <h2 className='font-medium text-2xl'>
            {t('HowInformationCollected')}
          </h2>
          <p className='text-sm leading-relaxed'>
            <span className='font-semibold tracking-wide text-lg'>
              {t('VoluntarySubmission')}
            </span>
            <br />
            <span className='block mt-3'>
              {t('VoluntarySubmissionDescription')}
            </span>
          </p>
          <p className='text-sm leading-relaxed'>
            <span className='font-semibold tracking-wide text-lg'>
              {t('AutomatedDataCollection')}
            </span>
            <br />
            <span className='block mt-3'>
              {t('AutomatedDataCollectionDescription')}
            </span>
          </p>
          <p className='text-sm leading-relaxed'>
            <span className='font-semibold tracking-wide text-lg'>
              {t('CommunicationChannels')}
            </span>
            <br />
            <span className='block mt-3'>
              {t('CommunicationChannelsDescription')}
            </span>
          </p>
        </div>

        <div className='purpose space-y-4 my-6'>
          <h2 className='font-medium text-2xl'>
            {t('PurposeOfDataCollection')}
          </h2>

          <p className='text-sm leading-relaxed'>
            <span className='font-semibold tracking-wide text-lg'>
              {t('ProvidingServices')}
            </span>
            <br />
            <span className='block mt-3'>
              {t('ProvidingServicesDescription')}
            </span>
          </p>
          <p className='text-sm leading-relaxed'>
            <span className='font-semibold tracking-wide text-lg'>
              {t('Communication')}
            </span>
            <br />
            <span className='block mt-3'>{t('CommunicationDescription')}</span>
          </p>
          <p className='text-sm leading-relaxed'>
            <span className='font-semibold tracking-wide text-lg'>
              {t('ImprovingUserExperience')}
            </span>
            <br />
            <span className='block mt-3'>
              {t('ImprovingUserExperienceDescription')}
            </span>
          </p>

          <p className='text-sm leading-relaxed'>
            <span className='font-semibold tracking-wide text-lg'>
              {t('Personalization')}
            </span>
            <br />
            <span className='block mt-3'>
              {t('PersonalizationDescription')}
            </span>
          </p>
        </div>

        <div className='data_protection space-y-4 my-6'>
          <p className='text-sm leading-relaxed'>
            <span className='font-semibold tracking-wide text-lg'>
              {t('Encryption')}
            </span>
            <br />
            <span className='block mt-3'>{t('EncryptionDescription')}</span>
          </p>
          <p className='text-sm leading-relaxed'>
            <span className='font-semibold tracking-wide text-lg'>
              {t('AccessControls')}
            </span>
            <br />
            <span className='block mt-3'>{t('AccessControlsDescription')}</span>
          </p>
          <p className='text-sm leading-relaxed'>
            <span className='font-semibold tracking-wide text-lg'>
              {t('EmployeeTraining')}
            </span>
            <br />
            <span className='block mt-3'>
              {t('EmployeeTrainingDescription')}
            </span>
          </p>
        </div>

        <div className='user_rights space-y-4 my-6'>
          <p className='text-sm leading-relaxed'>
            <span className='font-semibold tracking-wide text-lg'>
              {t('RightToAccess')}
            </span>
            <br />
            <span className='block mt-3'>{t('RightToAccessDescription')}</span>
          </p>
          <p className='text-sm leading-relaxed'>
            <span className='font-semibold tracking-wide text-lg'>
              {t('RightToRectification')}
            </span>
            <br />
            <span className='block mt-3'>
              {t('RightToRectificationDescription')}
            </span>
          </p>
          <p className='text-sm leading-relaxed'>
            <span className='font-semibold tracking-wide text-lg'>
              {t('RightToErasure')}
            </span>
            <br />
            <span className='block mt-3'>{t('RightToErasureDescription')}</span>
          </p>
        </div>

        <div className='user_rights space-y-4 my-6'>
          <h2 className='font-medium text-2xl'>{t('PolicyUpdates')}</h2>
          <p className='text-sm leading-relaxed'>
            {t('PolicyUpdatesDescription')}
          </p>
        </div>

        <div className='contact space-y-4 my-6'>
          <h2 className='font-medium text-2xl'>{t('ContactInformation')}</h2>
          <p className='text-sm leading-relaxed'>
            {t('ContactUsRegardingPrivacy')}
          </p>
        </div>

        <p className='text-sm leading-relaxed text-gray-400 font-light mb-3'>
          {t('LastUpdated')}
        </p>
      </div>
    </>
  )
}

export default Policy
