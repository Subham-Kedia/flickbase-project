const Accesscontrol = require("accesscontrol")

const resources = {
  profile: ["*", "!password", "!__v", "!_id"],
}

let grantsObject = {
  admin: {
    profile: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
  },
  user: {
    profile: {
      "read:own": resources.profile,
      "update:own": resources.profile,
    },
  },
}

const roles = new Accesscontrol(grantsObject)

module.exports = { roles }
