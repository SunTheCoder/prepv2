'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,  // ✅ Use UUID
        defaultValue: Sequelize.UUIDV4 // ✅ Auto-generate UUID
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true  // ✅ Ensure uniqueness
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true  // ✅ Ensure uniqueness
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bio: {
        type: Sequelize.STRING,
        allowNull: true  // ✅ Allow null values
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};