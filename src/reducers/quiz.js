import { createSlice } from '@reduxjs/toolkit'

// Change these to your own questions!
const questions = [
  {
    id: 1,
    questionText: 'What is Maks favourite expression for describing "whatever"?',
    options: ['wosh', 'blablabla', '*whistling sound*', 'Guys - whatever'],
    correctAnswerIndex: 1,
    lottie: 'https://assets7.lottiefiles.com/packages/lf20_Zz37yH.json'
  },
  { 
    id: 2, 
    questionText: 'Which of the statements is not true for Jennie?',
    options: ['she founded Kids Hack Club', 'has taken a course in creative writing', 'has been a hammer thrower', 'has completed Ironhack bootcamp'],
    correctAnswerIndex: 2,
    lottie: 'https://assets6.lottiefiles.com/private_files/lf30_AGoC3n.json'
  },
  {
    id: 3,
    questionText: 'Which royalty did Damien meet?',
    options: ['Prince William', 'Princess Märtha Louise', 'Prince Daniel', 'Prince Joachim'],
    correctAnswerIndex: 2, 
    lottie: 'https://assets9.lottiefiles.com/packages/lf20_AopHZg.json'
  },
  {
    id: 4,
    questionText: 'At what company did Poya do his master thesis??',
    options: ['Adecco', 'Ericsson', 'Tv4', 'Nokoby'],
    correctAnswerIndex: 2,
    lottie: 'https://assets2.lottiefiles.com/packages/lf20_eDnQim.json'
  },
  { 
    id: 5,
    questionText: 'Van does not speak one of these languages. Which one?',
    options: ['Swedish', 'Romanian', 'English', 'Bulgarian'],
    correctAnswerIndex: 3,
    lottie: 'https://assets2.lottiefiles.com/packages/lf20_BvVcMG.json'
  }
]

const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false
}

export const quiz = createSlice({
  name: 'quiz',
  initialState,
  reducers: {

    /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */
    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload
      const question = state.questions.find((q) => q.id === questionId)

      if (!question) {
        throw new Error('Could not find question! Check to make sure you are passing the question id correctly.')
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(`You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`)
      }

      if (state.currentQuestionIndex + 1 === state.questions.length)
        state.quizOver = true

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex
      })
    },

    /**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */
    goToNextQuestion: (state) => {
      // if (state.currentQuestionIndex + 1 === state.questions.length) {
      //   state.quizOver = true
      
      state.currentQuestionIndex += 1
      
    },

    /**
     * Use this action to reset the state to the initial state the page had
     * when it was loaded. Who doesn't like re-doing a quiz when you know the
     * answers?!
     *
     * This action does not require a payload.
     */
    restart: () => {
      return initialState
    }

  }
})
