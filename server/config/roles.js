const Accesscontrol = require("accesscontrol")

const resources = {
  profile: ["*", "!password", "!__v", "!_id"],
}
const ALL_ACCESS = {
  "create:any": ["*", "!_id", "!__v"],
  "read:any": ["*"],
  "update:any": ["*"],
  "delete:any": ["*"],
}

let grantsObject = {
  admin: {
    profile: ALL_ACCESS,
    article: ALL_ACCESS,
  },
  user: {
    profile: {
      "read:own": resources.profile,
      "update:own": resources.profile,
    },
    article: {
      "read:any": ["*"],
    },
  },
}

const roles = new Accesscontrol(grantsObject)

module.exports = { roles }
