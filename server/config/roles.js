const Accesscontrol = require("accesscontrol")

let grantsObject = {
    admin:{
        test:{
            "create:any":['*'],
            "read:any":['*'],
            "update:any":['*'],
            "delete:any":["*"],
        },
        articles:{
            "create:any":['*'],
            "read:any":['*'],
            "update:any":['*'],
            "delete:any":["*"],
        }
    },
    user:{
        test:{
            "read:any":["*"]
        },
        articles:{
            "read:any":["*"]
        }
    }
}

const roles = new Accesscontrol(grantsObject)

module.exports = {roles}