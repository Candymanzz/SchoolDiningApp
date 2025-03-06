const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Employee = sequelize.define('employee', {
    employee_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    position: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
})

const Class = sequelize.define('class', {
    class_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
})

const Student = sequelize.define('student', {
    student_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false }
})

const Attendance = sequelize.define('attendance', {
    attendance_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.BOOLEAN, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false }
})

const Event = sequelize.define('event', {
    event_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false},
    file: { type: DataTypes.STRING, allowNull: true}
})

const Participant = sequelize.define('participant', {
    participant_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    grade: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    studentStudentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    eventEventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    classClassId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    indexes: [
        {
            fields: ['studentStudentId', 'eventEventId', 'classClassId'],
        },
    ],
    uniqueKeys: {},
});


Employee.hasOne(Class, { onDelete: 'cascade' })
Class.belongsTo(Employee)

Class.hasOne(Student, { onDelete: 'cascade' })
Student.belongsTo(Class)

Student.hasMany(Attendance, { onDelete: 'cascade' })
Attendance.belongsTo(Student)

Student.belongsToMany(Event, {
    through: Participant,
    foreignKey: 'studentStudentId',
    otherKey: 'eventEventId',      
    onDelete: 'cascade',
});
Event.belongsToMany(Student, {
    through: Participant,
    foreignKey: 'eventEventId',   
    otherKey: 'studentStudentId', 
    onDelete: 'cascade',
});
Class.belongsToMany(Event, {
    through: Participant,
    foreignKey: 'classClassId',   
    otherKey: 'eventEventId',    
    onDelete: 'cascade',
});
Event.belongsToMany(Class, {
    through: Participant,
    foreignKey: 'eventEventId',  
    otherKey: 'classClassId',  
    onDelete: 'cascade',
});

module.exports = {
    Employee,
    Class,
    Student,
    Attendance,
    Event,
    Participant,
}