export interface Upload {
    progress: number
    state: 'PENDING' | 'IN_PROGRESS' | 'DONE'
  }