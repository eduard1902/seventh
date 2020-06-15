'use strict';

let money,
    start = function() {
        do {
            money = prompt('Ваш месячный доход?', 50000); 
        }
        while (isNaN(money) || money === '' || money === null);
};
start();

let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],// дополнительные доходы
    expenses: {}, // дополнительные расходы
    addExpenses: [], // возможные расходы
    deposit: false, //
    mission: 50000, 
    period: 3,
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?'); 

        let expensesName,
            question;

            
        for (let i = 0; i < 2; i++) {
            do {
                expensesName = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Телефон');
            }
            while(!isNaN(expensesName) || expensesName == '' || expensesName === null);

            do {
                question = +prompt('Во сколько это обойдется?', 2500);
            }     
            while(isNaN(question) || question == '' || question === null);

            appData.expenses[expensesName] = +question;
            }
        },

        //Сумма расходов
        getExpensesMonth: function() {
            for (let key in appData.expenses) {
                 appData.expensesMonth += appData.expenses[key];
            }

            console.log('Расходы за месяц ' + appData.expensesMonth + ' рублей');
        },

        // Бюджет в месяц и день
        getBudget: function() {
            appData.budgetMonth =  appData.budget - appData.expensesMonth;
            appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        },

        // Достижение цели
        getTargetMonth: function() {
            let purpose = Math.ceil(appData.mission / appData.budgetMonth);
                
            if (purpose >0){
                console.log('Цель будет достигнута за ' + purpose + ' месяца');
            } else {
                console.log('Цель не будет достигнута');
            }
        },
            
        // Уровень дохода
        getStatusIncome: function() {
            if (appData.budgetDay > 1200) {
                console.log('У вас высокий уровень дохода');
            } else if (600 < appData.budgetDay){ 
            console.log('У вас средний уровень дохода');
            } else if (0 < appData.budgetDay) {
                console.log('У вас средний уровень дохода');
            } else if (0 > appData.budgetDay) {
                console.log('Что то пошло не так');
            }
        }
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();


console.log("Наша программа включает в себя данные: ");
for ( let key in appData){
console.log(key + ": " + appData[key]);
}


