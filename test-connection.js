const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  try {
    console.log('🔄 Testing MongoDB Connection...\n');
    
    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('✅ MongoDB Connected Successfully!');
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🌐 Host: ${conn.connection.host}`);
    console.log(`🔌 Port: ${conn.connection.port}`);
    console.log(`📝 Connection State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    
    // Get collections
    const collections = await conn.connection.db.listCollections().toArray();
    console.log(`\n📁 Collections in database:`);
    if (collections.length === 0) {
      console.log('   No collections yet (will be created when data is added)');
    } else {
      collections.forEach(col => {
        console.log(`   - ${col.name}`);
      });
    }
    
    // Get database stats
    const stats = await conn.connection.db.stats();
    console.log(`\n📊 Database Statistics:`);
    console.log(`   - Collections: ${stats.collections}`);
    console.log(`   - Documents: ${stats.objects}`);
    console.log(`   - Data Size: ${(stats.dataSize / 1024).toFixed(2)} KB`);
    console.log(`   - Storage Size: ${(stats.storageSize / 1024).toFixed(2)} KB`);
    
    console.log('\n✅ MongoDB connection test completed successfully!\n');
    
    await mongoose.connection.close();
    console.log('🔒 Connection closed.');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

testConnection();
