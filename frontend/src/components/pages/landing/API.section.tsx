import { Trans } from 'react-i18next'
import sectionStyle from './API.section.module.css'
import landingStyle from './LandingPage.module.css'
import { Button } from 'components/atoms'
import { GlobeIcon } from 'components/atoms/icons/globe.icon'
import { AnimatedSection } from './AnimatedSection'

export const APISection = () => {
  return (
    <AnimatedSection>
      <div className={sectionStyle.container}>
        <div className={sectionStyle.lineContainer}>
          <div className={sectionStyle.fadingLine}> </div>
        </div>
        <div className={sectionStyle.contentContainer}>
          <div className={`${landingStyle.title} text-left mt-8`}>
            <Trans i18nKey="apiSectionTitle" ns="landing" />
          </div>
          <div className={`${landingStyle.subtitle} text-left mt-4 mb-8`}>
            <Trans i18nKey="apiSectionSubtitle" ns="landing" />
          </div>
          <div className="text-left mb-8 ">
            <Button buttonStyle="outline">
              <Trans i18nKey="readMore" ns="landing" />
            </Button>
          </div>
        </div>
        <div className="col-span-4 md:col-start-8 xl:col-start-9">
          <GlobeIcon />
        </div>
      </div>
    </AnimatedSection>
  )
}
