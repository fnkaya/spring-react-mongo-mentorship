export const validateCategory = (name, topics) => {
    return (name && name !== '' && topics && topics.length > 0)
}


export const DESCRIPTION_CHARACTER_LIMIT = 25
export const validateMentorApplication = (category, subjects, description) => {
    return (category && subjects && subjects.length > 0 && description && description.length >= DESCRIPTION_CHARACTER_LIMIT)
}

export const validatePhase = (newPhase, lastPhase) => {
    return (newPhase && newPhase.name && newPhase.name !== '' && newPhase.endDate && newPhase.endDate !== '' /*&&
        (!lastPhase || (newPhase.endDate.getDay() - lastPhase.endDate.getDay() >= 1))*/)
}