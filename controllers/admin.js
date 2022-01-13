///////////////////////////////////////////
// Requires
///////////////////////////////////////////
const User = require('../models/users');
const Role = require('../models/roles');
const Rule = require('../models/rules');

///////////////////////////////////////////
// Benutzerfunktionen
///////////////////////////////////////////

// Template Benutzerübersicht 
exports.getUsers = (req, res, next) => {
    User.findAll().then(users => {
        res.render('backend/user/table', {
            data: users,
            path: "/users", 
            pageTitle: "Benutzer",
            toolbarItems: {
                0: {
                    link: '/users/add-user',
                    class: 'add',
                    text: 'Hinzufügen' 
                }
            }
        });
    }).catch(error => {
        console.log(error);
    })
};

// Template Benutzer hinzufügen
exports.addUser = (req, res, next) => {
    res.render('backend/user/detail', {
        path: "/users/add-user", 
        pageTitle: "Benutzer hinzufügen",
        editMode: true,
        form: {
            action: '/users/save-user'
        },
        toolbarItems: {
            0: {
                link: '/users',
                class: 'back',
                text: 'Zurück',
            },
            1: {
                class: 'add',
                text: 'Hinzufügen',
                type: 'submit'
            }
        }
    });
};

// Template Benutzerdetailseite
exports.getUser = (req, res, next) => {
    const userID = req.params.userID;
    const action = req.query.action;

    if(action == 'edit') {    
        User.findByPk(userID)
            .then(user => {   
                res.render('backend/user/detail', {
                    user: user,
                    path: `/users/${userID}?action=edit`,
                    pageTitle: user.firstname,   
                    editMode: true,
                    form: {
                        action: `/users/edit-user?id=${userID}`
                    },
                    toolbarItems: {
                        0: {
                            link: '/users',
                            class: 'back',
                            text: 'Zurück',
                        },
                        1: {
                            class: 'save',
                            text: 'Speichern',
                            type: 'submit'
                        }
                    }
                });
            }).catch(error => { console.log(error); });
    } else if (action == 'delete') {     
        User.findByPk(userID)
            .then(user => {        
                res.render('backend/user/detail', {
                    user: user,
                    path: `/users/${userID}?action=delete`,
                    pageTitle: user.firstname,
                    editMode: false,
                    form: {
                        action: `/users/delete-user?id=${userID}`
                    },
                    toolbarItems: {
                        0: {
                            class: 'delete',
                            text: 'Entfernen',
                            type: 'submit'
                        }
                    }
                });
            }).catch(error => { console.log(error); });
    } else {   
        User.findByPk(userID)
            .then(user => {
                res.render('backend/user/detail', {
                    user: user,
                    path: "/users/:userID", 
                    pageTitle: user.firstname,
                    editMode: false,
                    toolbarItems: {
                        0: {
                            link: '/users',
                            class: 'back',
                            text: 'Zurück',
                        },
                        1: {
                            link: `/users/${userID}?action=edit`,
                            class: 'edit',
                            text: 'Bearbeiten',
                        },
                        2: {
                            link: `/users/delete-user?id=${userID}`,
                            class: 'delete',
                            text: 'Entfernen',
                        }
                    }
                });
            }).catch(error => { console.log(error); });
    }
};

// Funktion Benutzer hinzufügen
exports.saveUser = (req, res, next) => {    
    User.create({
        firstname: req.body.firstname, 
        lastname: req.body.lastname, 
        email: req.body.email,
        phone: req.body.phone,
    }).then(result => {
        res.redirect('/users');        
    }).catch(error => {
        console.log(error);
    });
};

// Funktion Benutzer löschen
exports.deleteUser = (req, res, next) => {   
    const userID = req.query.id;
    User.findByPk(userID)
    .then(user => {
        return user.destroy();      
    })
    .then(result => {
        res.redirect('/users');  
    })
    .catch(error => {
        console.log(error);
    });
};


// Funktion Benutzer bearbeiten
exports.editUser = (req, res, next) => { 
    const userID = req.query.id;  
    User.findByPk(userID)
    .then(user => {
        user.firstname = req.body.firstname; 
        user.lastname = req.body.lastname; 
        user.email = req.body.email;
        user.phone = req.body.phone;
        return user.save();      
    })
    .then(result => {
        res.redirect('/users');  
    })
    .catch(error => {
        console.log(error);
    });
};

///////////////////////////////////////////
// Benutzergruppen
///////////////////////////////////////////

// Template Benutzergruppenübersicht 
exports.getRoles = (req, res, next) => {
    Role.findAll().then(roles => {
        res.render('backend/role/table', {
            data: roles,
            path: "/roles", 
            pageTitle: "Benutzergruppen",
            toolbarItems: {
                0: {
                    link: '/roles/add-role',
                    class: 'add',
                    text: 'Hinzufügen' 
                }
            }
        });
    }).catch(error => {
        console.log(error);
    })
};

// Template Benutzergruppe hinzufügen
exports.addRole = (req, res, next) => {
    res.render('backend/role/detail', {
        path: "/roles/add-role", 
        pageTitle: "Benutzergruppe hinzufügen",
        editMode: true,
        form: {
            action: '/roles/save-role'
        },
        toolbarItems: {
            0: {
                link: '/roles',
                class: 'back',
                text: 'Zurück',
            },
            1: {
                class: 'add',
                text: 'Hinzufügen',
                type: 'submit'
            },
        }
    });
};

// Template Benutzerrollendetailseite
exports.getRole = (req, res, next) => {
    const roleID = req.params.roleID;
    const action = req.query.action;

    if(action == 'edit') {    
        Role.findByPk(roleID)
            .then(role => {   
                res.render('backend/role/detail', {
                    user: role,
                    path: `/roles/${roleID}?action=edit`,
                    pageTitle: role.title,   
                    editMode: true,
                    form: {
                        action: `/roles/edit-role?id=${roleID}`
                    },
                    toolbarItems: {
                        0: {
                            link: '/roles',
                            class: 'back',
                            text: 'Zurück',
                        },
                        1: {
                            class: 'save',
                            text: 'Speichern',
                            type: 'submit'
                        }
                    }
                });
            }).catch(error => { console.log(error); });
    } else if (action == 'delete') {     
        Role.findByPk(roleID)
            .then(role => {        
                res.render('backend/role/detail', {
                    user: role,
                    path: `/roles/${roleID}?action=delete`,
                    pageTitle: role.title,
                    editMode: false,
                    form: {
                        action: `/roles/delete-role?id=${roleID}`
                    },
                    toolbarItems: {
                        0: {
                            class: 'delete',
                            text: 'Entfernen',
                            type: 'submit'
                        }
                    }
                });
            }).catch(error => { console.log(error); });
    } else {   
        Role.findByPk(roleID)
            .then(role => {
                res.render('backend/role/detail', {
                    user: role,
                    path: "/roles/:roleID", 
                    pageTitle: role.title,
                    editMode: false,
                    toolbarItems: {
                        0: {
                            link: '/roles',
                            class: 'back',
                            text: 'Zurück',
                        },
                        1: {
                            link: `/roles/${roleID}?action=edit`,
                            class: 'edit',
                            text: 'Bearbeiten',
                        },
                        2: {
                            link: `/roles/delete-role?id=${roleID}`,
                            class: 'delete',
                            text: 'Entfernen',
                        }
                    }
                });
            }).catch(error => { console.log(error); });
    }
};

// Funktion Benutzerrolle hinzufügen
exports.saveRole = (req, res, next) => {    
    Role.create({
        title: req.body.title,
    }).then(result => {
        res.redirect('/roles');        
    }).catch(error => {
        console.log(error);
    });
};

// Funktion Benutzerrolle löschen
exports.deleteRole = (req, res, next) => {   
    const roleID = req.query.id;
    Role.findByPk(roleID)
    .then(role => {
        return role.destroy();      
    })
    .then(result => {
        res.redirect('/roles');  
    })
    .catch(error => {
        console.log(error);
    });
};


// Funktion Benutzerrolle bearbeiten
exports.editRole = (req, res, next) => { 
    const roleID = req.query.id;  
    Role.findByPk(roleID)
    .then(role => {
        role.title = req.body.title;
        return role.save();      
    })
    .then(result => {
        res.redirect('/roles');  
    })
    .catch(error => {
        console.log(error);
    });
};

///////////////////////////////////////////
// Benutzerrechte
///////////////////////////////////////////

// Template Benutzerrechteübersicht 
exports.getRules = (req, res, next) => {
    Rule.findAll().then(rules => {
        res.render('backend/rule/table', {
            data: rules,
            path: "/rules", 
            pageTitle: "Benutzerrechte",
            toolbarItems: {
                0: {
                    link: '/rules/add-rule',
                    class: 'add',
                    text: 'Hinzufügen' 
                }
            }
        });
    }).catch(error => {
        console.log(error);
    })
};

// Template Benutzerrechte hinzufügen
exports.addRule = (req, res, next) => {
    res.render('backend/rule/detail', {
        path: "/rules/add-rule", 
        pageTitle: "Benutzerrechte hinzufügen",
        editMode: true,
        form: {
            action: '/rules/save-rule'
        },
        toolbarItems: {
            0: {
                link: '/rules',
                class: 'back',
                text: 'Zurück',
            },
            1: {
                class: 'add',
                text: 'Hinzufügen',
                type: 'submit'
            }
        }
    });
};

// Template Benutzerrollendetailseite
exports.getRule = (req, res, next) => {
    const ruleID = req.params.ruleID;
    const action = req.query.action;

    if(action == 'edit') {    
        Rule.findByPk(ruleID)
            .then(rule => {   
                res.render('backend/rule/detail', {
                    user: rule,
                    path: `/rules/${ruleID}?action=edit`,
                    pageTitle: rule.title,   
                    editMode: true,
                    form: {
                        action: `/rules/edit-rule?id=${ruleID}`
                    },
                    toolbarItems: {
                        0: {
                            link: '/rules',
                            class: 'back',
                            text: 'Zurück',
                        },
                        1: {
                            class: 'save',
                            text: 'Speichern',
                            type: 'submit'
                        }
                    }
                });
            }).catch(error => { console.log(error); });
    } else if (action == 'delete') {     
        Rule.findByPk(ruleID)
            .then(rule => {        
                res.render('backend/rule/detail', {
                    user: rule,
                    path: `/rules/${ruleID}?action=delete`,
                    pageTitle: rule.title,
                    editMode: false,
                    form: {
                        action: `/rules/delete-rule?id=${ruleID}`
                    },
                    toolbarItems: {
                        0: {
                            class: 'delete',
                            text: 'Entfernen',
                            type: 'submit'
                        }
                    }
                });
            }).catch(error => { console.log(error); });
    } else {   
        Rule.findByPk(ruleID)
            .then(rule => {
                res.render('backend/rule/detail', {
                    user: rule,
                    path: "/rules/:ruleID", 
                    pageTitle: rule.title,
                    editMode: false,
                    toolbarItems: {
                        0: {
                            link: '/rules',
                            class: 'back',
                            text: 'Zurück',
                        },
                        1: {
                            link: `/rules/${ruleID}?action=edit`,
                            class: 'edit',
                            text: 'Bearbeiten',
                        },
                        2: {
                            link: `/rules/delete-rule?id=${ruleID}`,
                            class: 'delete',
                            text: 'Entfernen',
                        }
                    }
                });
            }).catch(error => { console.log(error); });
    }
};

// Funktion Benutzerrolle hinzufügen
exports.saveRule = (req, res, next) => {    
    Rule.create({
        title: req.body.title,
    }).then(result => {
        res.redirect('/rules');        
    }).catch(error => {
        console.log(error);
    });
};

// Funktion Benutzerrolle löschen
exports.deleteRule = (req, res, next) => {   
    const ruleID = req.query.id;
    Rule.findByPk(ruleID)
    .then(rule => {
        return rule.destroy();      
    })
    .then(result => {
        res.redirect('/rules');  
    })
    .catch(error => {
        console.log(error);
    });
};


// Funktion Benutzerrolle bearbeiten
exports.editRule = (req, res, next) => { 
    const ruleID = req.query.id;  
    Rule.findByPk(ruleID)
    .then(rule => {
        rule.title = req.body.title;
        return rule.save();      
    })
    .then(result => {
        res.redirect('/rules');  
    })
    .catch(error => {
        console.log(error);
    });
};