const Accesscontrol = require("accesscontrol")

let grantsObject = {
    admin:{
        profile:{
            "create:any":['*'],
            "read:any":['*'],
            "update:any":['*'],
            "delete:any":["*"],
        }
    },
    user:{
        profile:{
            "read:own":["*"],
            "update:own":["*", "!password", "!_id"]
        }
    }
}

const roles = new Accesscontrol(grantsObject)

module.exports = {roles}