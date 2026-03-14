import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  aiSummary: string;
  status: 'pending' | 'approved' | 'rejected';
}

type FilterType = 'pending' | 'handled';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterType>('pending');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000';
      const response = await fetch(`${API_URL}/api/messages`);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      // Fallback mock data
      setMessages([
        {
          id: 1,
          text: 'User wants to cancel subscription',
          aiSummary: 'Customer requesting subscription cancellation. Sentiment: Negative. Priority: High.',
          status: 'pending',
        },
        {
          id: 2,
          text: 'How do I reset my password?',
          aiSummary: 'Password reset inquiry. Sentiment: Neutral. Priority: Medium.',
          status: 'pending',
        },
        {
          id: 3,
          text: 'Great product! Very satisfied.',
          aiSummary: 'Positive feedback about product quality. Sentiment: Positive. Priority: Low.',
          status: 'pending',
        },
        {
          id: 4,
          text: 'The app keeps crashing on startup',
          aiSummary: 'Technical issue - app crash on startup. Sentiment: Negative. Priority: High.',
          status: 'pending',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = (id: number) => {
    setMessages(messages.map(msg =>
      msg.id === id ? { ...msg, status: 'approved' } : msg
    ));
  };

  const handleReject = (id: number) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  const filteredMessages = messages.filter(msg => 
    activeTab === 'pending' ? msg.status === 'pending' : msg.status === 'approved'
  );

  const pendingCount = messages.filter(msg => msg.status === 'pending').length;
  const handledCount = messages.filter(msg => msg.status === 'approved').length;

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={styles.messageCard}>
      <View style={styles.cardHeader}>
        <View style={styles.statusBadge}>
          <View style={[styles.statusDot, item.status === 'pending' ? styles.dotPending : styles.dotHandled]} />
          <Text style={styles.statusText}>{item.status === 'pending' ? 'Needs Review' : 'Resolved'}</Text>
        </View>
        <Text style={styles.messageId}>ID: #{item.id}</Text>
      </View>
      
      <Text style={styles.messageText}>{item.text}</Text>
      
      <View style={styles.aiSummaryContainer}>
        <View style={styles.aiSummaryHeader}>
           <Text style={styles.aiIcon}>✨</Text>
           <Text style={styles.aiSummaryLabel}>AI Analysis</Text>
        </View>
        <Text style={styles.aiSummaryText}>{item.aiSummary}</Text>
      </View>

      {item.status === 'pending' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.approveButton]}
            activeOpacity={0.8}
            onPress={() => handleApprove(item.id)}
          >
            <Text style={styles.approveButtonText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.rejectButton]}
            activeOpacity={0.8}
            onPress={() => handleReject(item.id)}
          >
            <Text style={styles.rejectButtonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {item.status === 'approved' && (
        <View style={styles.handledBadge}>
          <Text style={styles.handledText}>✓ Successfully Approved</Text>
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Syncing Data...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        
        <View style={styles.header}>
           <View style={styles.headerTitleRow}>
              <View style={styles.headerIconContainer}>
                 <Text style={styles.headerIcon}>📱</Text>
              </View>
              <View>
                 <Text style={styles.headerTitle}>Task Inbox</Text>
                 <Text style={styles.headerSubtitle}>
                   {pendingCount} Pending  ·  {handledCount} Handled
                 </Text>
              </View>
           </View>

           <View style={styles.tabContainer}>
              <TouchableOpacity 
                style={[styles.tab, activeTab === 'pending' && styles.activeTab]} 
                onPress={() => setActiveTab('pending')}
              >
                <Text style={[styles.tabText, activeTab === 'pending' && styles.activeTabText]}>Pending</Text>
                {pendingCount > 0 && (
                  <View style={[styles.tabBadge, activeTab === 'pending' ? styles.activeTabBadge : styles.inactiveTabBadge]}>
                    <Text style={[styles.tabBadgeText, activeTab === 'pending' ? styles.activeTabBadgeText : styles.inactiveTabBadgeText]}>{pendingCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.tab, activeTab === 'handled' && styles.activeTab]} 
                onPress={() => setActiveTab('handled')}
              >
                <Text style={[styles.tabText, activeTab === 'handled' && styles.activeTabText]}>Handled</Text>
                {handledCount > 0 && (
                  <View style={[styles.tabBadge, activeTab === 'handled' ? styles.activeTabBadge : styles.inactiveTabBadge]}>
                    <Text style={[styles.tabBadgeText, activeTab === 'handled' ? styles.activeTabBadgeText : styles.inactiveTabBadgeText]}>{handledCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
           </View>
        </View>

        <FlatList
          data={filteredMessages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconCircle}>
                 <Text style={styles.emptyIcon}>{activeTab === 'pending' ? '🎉' : '📂'}</Text>
              </View>
              <Text style={styles.emptyTitle}>{activeTab === 'pending' ? 'Inbox Zero' : 'Empty Archive'}</Text>
              <Text style={styles.emptyText}>{activeTab === 'pending' ? "You've handled all pending messages!" : "No messages have been handled yet."}</Text>
            </View>
          }
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F9',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F7F9',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    zIndex: 10,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  headerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  headerIcon: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: -1, // Overlay bottom border
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#3B82F6',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#94A3B8',
  },
  activeTabText: {
    color: '#3B82F6',
  },
  tabBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  activeTabBadge: {
    backgroundColor: '#EFF6FF',
  },
  inactiveTabBadge: {
    backgroundColor: '#F1F5F9',
  },
  tabBadgeText: {
    fontSize: 12,
    fontWeight: '800',
  },
  activeTabBadgeText: {
    color: '#3B82F6',
  },
  inactiveTabBadgeText: {
    color: '#64748B',
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
    gap: 16,
  },
  messageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.02)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotPending: {
    backgroundColor: '#F59E0B',
  },
  dotHandled: {
    backgroundColor: '#10B981',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  messageId: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94A3B8',
  },
  messageText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
    lineHeight: 26,
  },
  aiSummaryContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  aiSummaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  aiIcon: {
    fontSize: 14,
  },
  aiSummaryLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#6366F1',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  aiSummaryText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#475569',
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  approveButton: {
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  rejectButton: {
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#FECDD3',
  },
  approveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  rejectButtonText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  handledBadge: {
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  handledText: {
    color: '#059669',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
    marginBottom: 24,
  },
  emptyIcon: {
    fontSize: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
});
