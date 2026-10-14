// app/(tabs)/(home)/index.tsx

import { router } from "expo-router";
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    Pressable,
    ScrollView,
} from "react-native";
import { useState } from "react";
import ArticleCard from "../../../components/article-card";
import { Article, ARTICLES } from "../../../data/articles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ArticleList() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = [...new Set(ARTICLES.map((a) => a.category))];

    const filtered = selectedCategory
        ? ARTICLES.filter((a) => a.category === selectedCategory)
        : ARTICLES;

    const handlePress = (article: Article) => {
        router.push({
            pathname: "/(home)/[id]",
            params: { id: article.id },
        });
    };

    return (
        <SafeAreaView style={styles.screen}>
            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ArticleCard article={item} onPress={handlePress} />
                )}
                contentContainerStyle={styles.list}
                ListHeaderComponent={
                    <View>
                        <View style={styles.listHeader}>
                            <Text style={styles.listHeaderText}>
                                {filtered.length} stories
                            </Text>
                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.filterList}
                        >
                            <Pressable
                                onPress={() => setSelectedCategory(null)}
                                style={[
                                    styles.filterPill,
                                    selectedCategory === null &&
                                        styles.filterPillActive,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.filterText,
                                        selectedCategory === null &&
                                            styles.filterTextActive,
                                    ]}
                                >
                                    All
                                </Text>
                            </Pressable>

                            {categories.map((category) => (
                                <Pressable
                                    key={category}
                                    onPress={() =>
                                        setSelectedCategory(category)
                                    }
                                    style={[
                                        styles.filterPill,
                                        selectedCategory === category &&
                                            styles.filterPillActive,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.filterText,
                                            selectedCategory === category &&
                                                styles.filterTextActive,
                                        ]}
                                    >
                                        {category}
                                    </Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#F0F4F8",
    },
    list: {
        paddingTop: 12,
        paddingBottom: 32,
    },
    listHeader: {
        paddingHorizontal: 16,
        paddingBottom: 12,
    },
    listHeaderText: {
        fontSize: 12,
        color: "#94A3B8",
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    filterList: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        gap: 8,
    },
    filterPill: {
        paddingHorizontal: 16,
        paddingVertical: 9,
        borderRadius: 24,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    filterPillActive: {
        backgroundColor: "#2563EB",
        borderColor: "#2563EB",
    },
    filterText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#64748B",
    },
    filterTextActive: {
        color: "#FFFFFF",
    },
});