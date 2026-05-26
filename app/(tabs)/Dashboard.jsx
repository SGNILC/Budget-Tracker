import { useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import Card from "../../components/ui/Card";
import { colors, spacing } from "../../constants/themes";
import { getExpenseTotalsByCategory, getTotalExpenses, getTotalIncome, initDB } from "../../db/database";

const SLICE_COLORS = [
	"#0061FF",
	"#FF9F1C",
	"#00D094",
	"#FF4D4D",
	"#7C3AED",
	"#0891B2",
	"#64748B",
];

const screenWidth = Dimensions.get("window").width;

export default function Dashboard() {
	const [categoryTotals, setCategoryTotals] = useState([]);
	const [totalExpense, setTotalExpense] = useState(0);
	const [totalIncome, setTotalIncome] = useState(0);

	useFocusEffect(
		useCallback(() => {
			initDB();
			setCategoryTotals(getExpenseTotalsByCategory());
			setTotalExpense(getTotalExpenses());
			setTotalIncome(getTotalIncome());
		}, []),
	);

	const chartData = useMemo(
		() =>
			categoryTotals.map((item, index) => ({
				name: item.category,
				amount: Number(item.total) || 0,
				color: SLICE_COLORS[index % SLICE_COLORS.length],
				legendFontColor: colors.textDark,
				legendFontSize: 13,
			})),
		[categoryTotals],
	);


	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.scrollContainer}
			showsVerticalScrollIndicator={false}
		>
			<Text style={styles.title}>Dashboard</Text>
            <Card style={styles.summaryCard}>
				<Text style={styles.summaryLabel}>Total Income</Text>
				<Text style={styles.summaryValue}>${totalIncome.toFixed(2)}</Text>
			</Card>
			<Card style={styles.summaryCard}>
				<Text style={styles.summaryLabel}>Total Expenses</Text>
				<Text style={styles.summaryValue}>${totalExpense.toFixed(2)}</Text>
			</Card>

			{chartData.length > 0 ? (
				<Card style={styles.chartCard}>
					<Text style={styles.cardTitle}>Spending by Category</Text>
					<PieChart
						data={chartData}
						width={screenWidth - 72}
						height={220}
						accessor="amount"
						backgroundColor="transparent"
						chartConfig={chartConfig}
						paddingLeft="85"
						absolute
						hasLegend={false}
					/>

					<View style={styles.legendContainer}>
						{chartData.map((item) => (
							<View key={item.name} style={styles.legendRow}>
								<View style={[styles.legendDot, { backgroundColor: item.color }]} />
								<Text style={styles.legendText}>{item.name}</Text>
								<Text style={styles.legendAmount}>${item.amount.toFixed(2)}</Text>
							</View>
						))}
					</View>
				</Card>
			) : (
				<Card style={styles.emptyCard}>
					<Text style={styles.emptyTitle}>No Expense Data Yet</Text>
					<Text style={styles.emptyText}>
						Add some expense transactions to see your category breakdown.
					</Text>
				</Card>
			)}
		</ScrollView>
	);
}

const chartConfig = {
	backgroundGradientFrom: colors.white,
	backgroundGradientTo: colors.white,
	color: () => colors.textDark,
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primary,
	},
	scrollContainer: {
		paddingHorizontal: spacing.md,
		paddingTop: spacing.statusBarHeight,
		paddingBottom: spacing.xl,
	},
	title: {
		color: colors.white,
		fontSize: 30,
		fontWeight: "700",
		marginBottom: spacing.md,
		textAlign: "center",
	},
	summaryCard: {
		marginBottom: spacing.md,
		alignItems: "center",
	},
	summaryLabel: {
		color: colors.textSecondary,
		fontSize: 14,
		marginBottom: 4,
	},
	summaryValue: {
		color: colors.textDark,
		fontSize: 30,
		fontWeight: "800",
	},
	chartCard: {
		paddingVertical: spacing.md,
	},
	cardTitle: {
		color: colors.textDark,
		fontSize: 18,
		fontWeight: "700",
		marginBottom: spacing.sm,
		textAlign: "center",
	},
	legendContainer: {
		marginTop: spacing.sm,
		gap: spacing.sm,
	},
	legendRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	legendDot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		marginRight: spacing.sm,
	},
	legendText: {
		color: colors.textDark,
		fontSize: 14,
		fontWeight: "600",
		flex: 1,
	},
	legendAmount: {
		color: colors.textSecondary,
		fontSize: 14,
		fontWeight: "600",
	},
	emptyCard: {
		alignItems: "center",
		paddingVertical: spacing.lg,
	},
	emptyTitle: {
		color: colors.textDark,
		fontSize: 18,
		fontWeight: "700",
		marginBottom: spacing.xs,
	},
	emptyText: {
		color: colors.textSecondary,
		fontSize: 14,
		textAlign: "center",
		lineHeight: 20,
	},
});
