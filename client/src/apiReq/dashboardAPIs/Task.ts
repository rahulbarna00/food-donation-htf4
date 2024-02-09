'use client';
import clientConnectionWithSupabase from "@/lib/supabase/client";

export const createNewTask = async (formdata: any) => {
    const supabase = clientConnectionWithSupabase()
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)

    const resultOftaskCreation: any = await supabase
        .from('votum_user_tasks')
        .insert([
            { name: formdata.name, priority: formdata.priority, dueDate: formdata.dueDate, status: false, user_id: parsedUserDetails.id },
        ])
        .select()

    if (resultOftaskCreation?.error !== null) {
        return resultOftaskCreation
    } else {
        return resultOftaskCreation
    }
}


export const getTasks = async () => {
    const supabase = clientConnectionWithSupabase()
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    let { data: userTasks, error } = await supabase
        .from('votum_user_tasks')
        .select("*")
        .eq('user_id', parsedUserDetails.id)

    if (userTasks !== null) {
        const todayDate = new Date();
        const formattedTodayDate = todayDate.toDateString();

        let pendingT: any = {
            todayDue: [],
            overDue: [],
            others: []
        }
        let completedT: any = []
        for (var i = 0; i < userTasks.length; i++) {
            if (userTasks[i].status === false) {

                const givenDate = new Date(userTasks[i].dueDate)
                const givenDateInString = givenDate.toDateString();
                console.log(todayDate < givenDate)
                if (formattedTodayDate === givenDateInString) {
                    pendingT.todayDue.push(userTasks[i])
                } else if (todayDate > givenDate) {
                    pendingT.overDue.push(userTasks[i])
                } else {
                    pendingT.others.push(userTasks[i]);
                }
            } else if (userTasks[i].status === true) {
                completedT.push(userTasks[i])
            }
        }
        console.log(pendingT)
        console.log(completedT)
        const taskObj = {
            pending: pendingT,
            completed: completedT
        }
        localStorage.setItem("votumUserTasks", JSON.stringify(taskObj))
    }
    return userTasks
}


export const makeDuplicate = async () =>{

}
