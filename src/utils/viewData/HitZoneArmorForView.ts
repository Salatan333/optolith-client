import { Maybe, Nothing } from '../structures/Maybe';
import { fromDefault, makeGetters } from '../structures/Record';

export interface HitZoneArmorForView {
  id: string
  name: string
  head: Maybe<number>
  leftArm: Maybe<number>
  leftLeg: Maybe<number>
  rightArm: Maybe<number>
  rightLeg: Maybe<number>
  torso: Maybe<number>
  enc: number
  addPenalties: boolean
  weight: number
}

const HitZoneArmorForView =
  fromDefault<HitZoneArmorForView> ({
    id: '',
    name: '',
    head: Nothing,
    leftArm: Nothing,
    leftLeg: Nothing,
    rightArm: Nothing,
    rightLeg: Nothing,
    torso: Nothing,
    enc: 0,
    addPenalties: false,
    weight: 0,
  })

export const HitZoneArmorForViewG = makeGetters (HitZoneArmorForView)