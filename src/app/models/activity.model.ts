export interface Activity {
    uuid: string
    nameActivity: string
    creatorActivity: string
    participantsActivity?: [string]
    photoActivity?: [string]
    dateActivity: string
    hoursActivity: [string]
    idLocation?: string
    descriptionActivity?: string
    privacyActivity: boolean
    roleActivity: string
    createdAt: string;
    updatedAt: string;
  }