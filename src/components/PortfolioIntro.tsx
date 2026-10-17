'use client'

import { useEffect } from 'react'
import { IntroStage } from '../types'

interface PortfolioIntroProps {
  onIntroStageChange?: (stage: IntroStage) => void
}

export default function PortfolioIntro({ onIntroStageChange }: PortfolioIntroProps) {
  useEffect(() => {
    // Stage 1: 'entering' (0ms) -> Navigation buttons slither in
    onIntroStageChange?.('entering')

    // Stage 2: 'focus' (1650ms) -> All buttons landed, discovery hint badge active
    const focusTimer = setTimeout(() => {
      onIntroStageChange?.('focus')
    }, 1650)

    // Stage 3: 'collapsing' (3250ms) -> Discovery hint fades out, drawer slides into collapsed tab state
    const collapseTimer = setTimeout(() => {
      onIntroStageChange?.('collapsing')
    }, 3250)

    // Stage 4: 'completed' (3750ms) -> Clean up intro, yield control to normal navigation
    const completeTimer = setTimeout(() => {
      onIntroStageChange?.('completed')
    }, 3750)

    return () => {
      clearTimeout(focusTimer)
      clearTimeout(collapseTimer)
      clearTimeout(completeTimer)
    }
  }, [onIntroStageChange])

  return null
}
