export interface BlueprintData {
    schemaVersion: number
    blueprints: Blueprint[]
}

export interface Blueprint {
    id: string
    name: string
    desc: string
    link: string
    images: string[]
    tags: string[]
    format: string
    size: string
    date: string
    requirements: BlueprintRequirement[]
}

export interface BlueprintRequirement {
    name: string
    note: string
}