import sectionStyle from './WhatYouNeed.section.module.css'
import landingPageStyle from './LandingPage.module.css'
import { Trans } from 'components/atoms'
import { Bullet } from 'components/atoms/bullet/Bullet'
import { AnimatedSection } from './AnimatedSection'

const style = {
  ...sectionStyle,
  ...landingPageStyle,
}

export const WhatYouNeedSection = () => {
  return (
    <AnimatedSection>
      <div className={style.bulletContainer}>
        <Bullet />
      </div>
      <div className={style.textContainer}>
        <div className={style.title}>
          <Trans i18nKey="WhatYouNeedTitle" ns="landing" />
        </div>
        <div className={style.description}>
          {/* <Trans i18nKey="WhatY" ns="landing" /> */}
        </div>
      </div>
    </AnimatedSection>
  )
}
