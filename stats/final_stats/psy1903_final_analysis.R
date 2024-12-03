#### Load Packages & Set Working Directory ------

if (!require("pacman")) {install.packages("pacman"); require("pacman")}

p_load("tidyverse","rstudioapi","lme4","emmeans","psych","corrplot","jsonlite")

setwd("~/Desktop/psy1903/stats/final_stats")

#### D-score Function --------------------------------

calculate_EST_dscore <- function(data){
  tmp <- data[data$correct == TRUE & data$rt > 300 & data$rt < 5000,]
  emotionA_trials <- tmp[tmp$valence == "emotionA",]
  emotionB_trials <- tmp[tmp$valence == "emotionB",]                    
  neutral_trials <- tmp[tmp$valence == "neutral",]
  
  emotionA_means <- mean(emotionA_trials$rt, na.rm = TRUE)
  emotionB_means <- mean(emotionB_trials$rt, na.rm = TRUE)
  neutral_means <- mean(neutral_trials$rt, na.rm = TRUE)
  neutral_sd <- sd(neutral_trials$rt, na.rm =TRUE)

  dscore1 <- (emotionA_means - neutral_means) / neutral_sd
  dscore2 <- (emotionB_means - neutral_means) / neutral_sd
  
  return(list(emotionA_d_score = dscore1, emotionB_d_score =dscore2)) 
}
calculate_EST_dscore(est_data2)


#### Questionnaire Scoring Function ---------------
est_test <- read.csv(file.choose())
score_questionnaire <- function(data) {
  
  json_data <- data[data$trialType == "questionnaire", "response"]
  
  questionnaire <- fromJSON(json_data[1])
  str(questionnaire)
  questionnaire <- as.data.frame(questionnaire)
  
  questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))
  
  score <- rowMeans(questionnaire,na.rm = TRUE)
  return(score)
}

print(questionnaire)
str(questionnaire)
summary(questionnaire)

#### For Loop ------------------------------------------
directory_path <- "/Users/stephaniezaragoza/Desktop/psy1903/osfstorage-archive"

files_list <- list.files(path = directory_path, pattern = "\\.csv$", full.names = TRUE)

dScores <- data.frame(matrix(nrow = length(files_list), ncol = 5))

colnames(dScores) <- c("participant_ID", "emotionA_d_score", "emotionB_d_score", "whichPrime", "questionnaire")

i = 1

est_data2$rt <- as.numeric(est_data2$rt)
str(est_data2)

est_data2$correct <- as.logical(est_data2$correct)
str(est_data2)

est_data2$block <- as.factor(est_data2$block)
est_data2$valence <- as.factor(est_data2$valence)
est_data2$color <- as.factor(est_data2$color)
str(est_data2)

for(file in files_list) { 

  tmp <- read.csv(file)
  
  participant_ID <- tools::file_path_sans_ext(basename(file))
  
  dScores[i,"participant_ID"] <- participant_ID

  dScores[i,c("emotionA_d_score", "emotionB_d_score")] <- calculate_EST_dscore(tmp)
  
  rm(tmp)
  i <- i + 1
}
write.csv(dScores,"~/Desktop/psy1903/stats/data_cleaning/data/participant_dScores.csv", row.names = FALSE)

for(file in files_list) { 
  
  tmp <- read.csv(file)
  tmp$correct <- as.logical(tmp$correct)

  participant_ID <- tools::file_path_sans_ext(basename(file))
  
  dScores[i,"participant_ID"] <- participant_ID
  
  dScores[i, "whichPrime"] <- tmp[tmp$trialType == "prime", "whichPrime"]
  
  dScores[i,c("emotionA_d_score", "emotionB_d_score")] <- calculate_EST_dscore(tmp)
  
  dScores[i, "questionnaire"] <- score_questionnaire(tmp)
  rm(tmp)
  i <- i + 1
}
write.csv(dScores,"~/Desktop/psy1903/stats/data_cleaning/data/participant_dScores.csv", row.names = FALSE)

dScores[, "whichPrime"] <- as.factor(dScores[, "whichPrime"])
questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))
dScores <- as.data.frame(lapply(dScores, as.numeric))


#### ANOVA -------------------------------------------

est <- read.csv("~/Desktop/psy1903/stats/data_cleaning/data/participant_dScores.csv")
aovA <-aov(emotionA_d_score ~ whichPrime,dScores)
aovB <-aov(emotionB_d_score ~ whichPrime, dScores)
summary(aovA)
summary(aovB)

#### T-Test ---------------------------------------------

tukey_result <-TukeyHSD(aovA)
View(tukey_result)
tukey_result[["whichPrime"]]

#### Correlation ---------------------------------------

cor(dScores,dScores$questionnaire)
cor(dScores$emotionA_d_score, dScores$questionnaire)
cor.test(dScores$emotionA_d_score, dScores$questionnaire)

#### Base R Histogram -------------------------------
library(ggplot2)
hist(dScores$emotionA_d_score,
     main = "Distribution of D-Scores", 
     xlab = "D-Scores",
     ylab = "Frequency")

#### ggplot Histogram --------------------------------

ggplot(dScores, aes(x=emotionA_d_score)) +
  geom_histogram(binwidth = 0.2, fill = "skyblue", color = "black") +
  labs(title = "Distribution of D-Scores", x = "D-Scores", y = "Frequency") +
  theme_minimal()

#### ggplot Histogram by Prime ---------------------

ggplot(dScores, aes(x=emotionA_d_score)) +
  geom_histogram(binwidth = 0.2, fill = "skyblue", color = "black") +
  labs(title = "Distribution of D-Scores", x = "D-Scores", y = "Frequency") +
  theme_classic() +
  facet_wrap(~whichPrime)

#### ggplot Box Plot ----------------------------------

ggplot(dScores, aes(x= whichPrime, y= emotionA_d_score)) +
  geom_boxplot(aes(fill = whichPrime)) +
  labs(title ="Effect of Prime on D-Scores",
       x = "Prime Condition",
       y = "D-Scores") +
  theme_classic() +
  theme(legend.position = "none") +
  scale_x_discrete(labels = c("failure" = "Failure", "neutral" = "Neutral", "success" = "Success" ))


#### ggplot Scatter Plot -------------------------------

ggplot(dScores, aes(x=emotionA_d_score, y=questionnaire))+
  geom_point() +
  labs(title = "Correlation Between Questionnaire and D-Scores", x= "Questionnaire", y= "D-Scores") +
  theme_classic() +
  geom_smooth(method = "lm")

#### ggplot Custom Theme ---------------------------

ggplot(dScores, aes(x=emotionA_d_score)) +
  geom_histogram(binwidth = 0.2, fill = "lavender", color = "skyblue") +
  labs(title = "Distribution of D-Scores", x = "D-Scores", y = "Frequency") +
  theme(
    plot.title = element_text(
      family = "Times New Roman",  
      size = 20,                  
      face = "bold",          
      color = "brown",           
    ),
    axis.title.x = element_text(
      family = "Times New Roman",
      size = 12,
      color = "chocolate",
      face = "bold"
    ),
    # Customize y-axis title
    axis.title.y = element_text(
      family = "Times New Roman",
      size = 12,
      color = "chocolate",
      face = "bold"
    )
  )
theme_classic() 
