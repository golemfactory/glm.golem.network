import { Bullet, Trans } from 'components/atoms'
import sectionStyle from './UseCase.section.module.css'
import landingStyle from './LandingPage.module.css'
import { Card } from './Card'
import { CardData } from './types'
import { AnimatedSection } from './AnimatedSection'

const useCases: CardData[] = [
  {
    title: 'deployCaseTitle',
    description: 'deployCaseDescription',
    icon: 'terminal',
    exploreLink: 'TODO',
  },
  {
    title: 'distributionCaseTitle',
    description: 'distributionCaseDescription',
    icon: 'arrows',
    exploreLink: 'TODO',
  },
  {
    title: 'AICaseTitle',
    description: 'AICaseDescription',
    icon: 'chip',
    badge: 'InternalAlfa',
  },
]
export const UseCaseSection = () => {
  return (
    <AnimatedSection>
      <div className={sectionStyle.container}>
        <div className={sectionStyle.bulletContainer}>
          <Bullet />
        </div>
        <div className={sectionStyle.titleContainer}>
          <div className={`${landingStyle.title} ml-4 sm:ml-0 text-left`}>
            <Trans i18nKey="useCasesTitle" ns="landing" />
          </div>
        </div>
        <div className={sectionStyle.separator} />
        {useCases
          .map((x) => {
            return { ...x, className: sectionStyle.card }
          })
          .map(Card)}
      </div>
    </AnimatedSection>
  )
}
