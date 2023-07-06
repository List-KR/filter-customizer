import * as OS from 'os'

export const AvailableThread = OS.cpus().length
export const AvailableModel = OS.cpus().map(Thread => Thread.model)[0]
export const AvailableTotalMem = OS.totalmem()
export const AvailableFreeMem = OS.freemem()
export const TmpDir = OS.tmpdir()