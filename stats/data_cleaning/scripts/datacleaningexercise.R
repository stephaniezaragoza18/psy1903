# 1. Open a blank RScript to write all of the following code (don't save it quite yet).

# 2. In your Console: Set your working directory to your psy1903/stats directory.

# The remaining steps should be completed in your RScript:

# 3. Using dir.create(): within your psy1903/stats/ directory create the following directories:

# data_cleaning (this will be the parent directory for our R exercises)
# data_cleaning/output (data visualizations and plots will go here)
# data_cleaning/scripts (this is where we'll save any scripts we create)
# data_cleaning/data (if we save any intermediary or final data files, they will go here)

setwd("~/Desktop/psy1903/stats")

dir.create("data_cleaning")
dir.create("./scripts")
dir.create("./data")
dir.create("./output")

# 4. Set your working directory to be "your_path/psy1903/stats/data_cleaning/scripts/"
setwd("~/Desktop/psy1903/stats/data_cleaning/scripts/")


# 5. Using pacman() and p_load(): Load packages ("tidyverse", "rstudioapi", "lme4", "emmeans", "psych", "corrplot", "jsonlite") #don't forget to add "jsonlite"
p_load("tidyverse","rstudioapi","lme4","emmeans","psych","corrplot", "jsonlite") 

# 6. Using read.csv(): Read in one participant's .csv file as a data frame called "iat_data1" or "est_data1"

est_data1 <- read.csv("~/Desktop/psy1903/osfstorage-archive/est-experiment-2024-11-05-21-53-50.csv", header = TRUE, sep = ",", na.strings = "NA", stringsAsFactors = FALSE) 
est_data1 <- read.csv("~/Desktop/psy1903/osfstorage-archive/est-experiment-2024-11-05-21-53-50.csv")

# You should keep your experiment's data files in psy1903/osfstorage-archive. To read them in, you will just need to provide the whole path to the .csv file (e.g., ~/Desktop/psy1903/osfstorage-archive/file_name.csv) or the relative path to the .csv file (e.g., ../../../osfstorage-archive/file_name.csv)
# 7. Examine your data frame using str() and summary(). Copy and paste the output of these two commands below.

str(est_data1)
summary(est_data1)

# 8. Save your RScript within your new scripts directory as dataCleaningExercise.R


est_data2 <- est_data1[est_data1$block == "emotionA" | 
                       est_data1$block == "emotionB",
c("trial_index", "rt","response","block", "word", "valence", "color", "correct")]


#9. Using the str() and summary() functions, check the structure of your subsetted data files. 
str(est_data2)
#EST: block, valence, color
est_data2$response <- as.factor(est_data2$response)
column_names <- c("block", "valence", "color")
for (column_name in column_names) {
  est_data2[,column_name] <- as.factor(est_data2[,column_name])
}
str(est_data2)
summary(est_data2)

#Step 4- Calculate D-Score

#Step 0- Set a Function
calculate_EST_dscore <- function(data){
#Step 1- Only select trials with rt < 300ms & > 5000
  tmp <- data[data$correct == TRUE & data$rt > 300 & data$rt < 5000,]
#Step 2- Separate congruent and incongruent trials
  emotionA_trials <- tmp[tmp$valence == "emotionA",]
  emotionB_trials <- tmp[tmp$valence == "emotionB",]                    
  neutral_trials <- tmp[tmp$valence == "neutral",]
  
#Step 3- Calculate means and standard deviations for congruent and incongruent trials
  emotionA_means <- mean(emotionA_trials$rt, na.rm = TRUE)
  emotionB_means <- mean(emotionB_trials$rt, na.rm = TRUE)
  neutral_means <- mean(neutral_trials$rt, na.rm = TRUE)
  neutral_sd <- sd(neutral_trials$rt, na.rm =TRUE)
#Step 4- Calculate D-score
  dscore1 <- (emotionA_means - neutral_means) / neutral_sd
  dscore2 <- (emotionB_means - neutral_means) / neutral_sd
  
return(list(emotionA_d_score = dscore1, emotionB_d_score =dscore2)) 
  }
calculate_EST_dscore(est_data2)

#make sure to run everything from {} and then do calculate_EST_dscore in the console!

#Putting a Loop Question 5 

## Set a variable called directory_path with the path to the location of your data csv files. This directory should *only* contain your raw participant csv data files and no other files.
directory_path <- "/Users/stephaniezaragoza/Desktop/psy1903/osfstorage-archive"

## Create a list of all the files in that directory.
files_list <- list.files(path = directory_path, pattern = "\\.csv$", full.names = TRUE)


## Create an empty data frame called dScores that has two columns (IAT) or three columns (EST) and as many rows as you have data files (e.g., participants)
## EST
dScores <- data.frame(matrix(nrow = length(files_list), ncol = 3))

## Rename the default column names to something meaningful
## EST
colnames(dScores) <- c("participant_ID", "emotionA_d_score", "emotionB_d_score")

## Initiate variable i to represent row numbers for each iteration, starting with 1
i = 1

## Now fill in the remaining code following the commented instructions:

## Initiate a for loop that iterates across each file in files_list

#Temporary set a single file for testing-remove later
# file <- files_list[[1]]
for(file in files_list) { 

# Use read.csv to read in your file as a temporary data frame called tmp
tmp <- read.csv(file)
# Assign participant_ID as the basename of the file
participant_ID <- tools::file_path_sans_ext(basename(file))

# Isolate the participant_ID column for the current row number (i) and assign it to be the current participant_ID variable
dScores[i,"participant_ID"] <- participant_ID

# Using similar logic, isolate the d_score OR c("emotionA_d_score", "emotionB_d_score") column(s) for the current row number (i) and assign it to be the current d-score(s) by using our calculate_IAT_dscore or calculate_EST_dscore on the tmp data file
dScores[i,c("emotionA_d_score", "emotionB_d_score")] <- calculate_EST_dscore(tmp)

# Remove the temporary data file tmp  
rm(tmp)
# Increase our row number variable i by one for the next iteration
i <- i + 1
}
## Outside of the for loop, save the new dScores data frame using write.csv() into your data_cleaning/data subdirectory:
write.csv(dScores,"~/Desktop/psy1903/stats/data_cleaning/data/participant_dScores.csv", row.names = FALSE)




#Task Set 12
#### Questionnaire Scoring -----------------------------------------------------

## Read in data file to a data frame called iat_test
iat_test <- read.csv("~/Desktop/psy1903/stats/data_cleaning/data/my-iat-test-data.csv")

## Extract questionnaire data

json_data <- iat_test[iat_test$trialType == "Questionnaire", "response"]

## Use fromJSON to Convert from JSON to data frame

questionnaire <- fromJSON(json_data)
str(questionnaire)
questionnaire <- as.data.frame(questionnaire)

## Convert to numeric
questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))
questionnaire2 <- questionnaire

## Reverse score if necessary
rev_items <-c("question1", "question3", "question5", "question7")
for (rev_item in rev_items) {
  questionnaire[,rev_item] <- 5 - questionnaire[,rev_item]
}

## Calculate mean or sum score
score <- rowMeans(questionnaire,na.rm = TRUE)

install.packages("jsonlite")
library(jsonlite)

#Questionnaire Scoring Function (Question 3)
## Initiate function called score_questionnaire that accepts a single argument called `data`. Within this function...
##est_test <- read.csv("/Users/stephaniezaragoza/Desktop/psy1903/stats/data-cleaning/data/my-est-experiment.csv")
##est_test <- read.csv("~/Desktop/psy1903/stats/data-cleaning/data/my-est-experiment.csv")

## Initiate function called score_questionnaire that accepts a single argument called `data`. Within this function...
est_test <- read.csv(file.choose())
score_questionnaire <- function(data) {

## Extract questionnaire data cell
json_data <- data[data$trialType == "Questionnaire", "response"]

## Use fromJSON to convert from JSON to data frame
questionnaire <- fromJSON(json_data)
str(questionnaire)
questionnaire <- as.data.frame(questionnaire)

## Convert to numeric
questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))

## Reverse score if necessary

## Calculate & return questionnaire score (mean)
score <- rowMeans(questionnaire,na.rm = TRUE)
return(score)
}

print(questionnaire)
str(questionnaire)
summary(questionnaire)


##Updated Loop (Question 4)
## Set a variable called directory_path with the path to the location of your data csv files. This directory should *only* contain your raw participant csv data files and no other files.
directory_path <- "/Users/stephaniezaragoza/Desktop/psy1903/osfstorage-archive"

## Create a list of all the files in that directory.
files_list <- list.files(path = directory_path, pattern = "\\.csv$", full.names = TRUE)


## Create an empty data frame called dScores that has two columns (IAT) or three columns (EST) and as many rows as you have data files (e.g., participants)
## EST
dScores <- data.frame(matrix(nrow = length(files_list), ncol = 3))

## Rename the default column names to something meaningful
## EST
colnames(dScores) <- c("participant_ID", "emotionA_d_score", "emotionB_d_score")

## Initiate variable i to represent row numbers for each iteration, starting with 1
i = 1

#Change rt column to numeric
#rt <- as.data.frame(lapply(rt, as.numeric))
est_data2$rt <- as.numeric(est_data2$rt)
str(est_data2)

#“correct” column is logical
est_data2$correct <- as.logical(est_data2$correct)
str(est_data2)

#Changing block, valence, color to factors 
est_data2$block <- as.factor(est_data2$block)
est_data2$valence <- as.factor(est_data2$valence)
est_data2$color <- as.factor(est_data2$color)
str(est_data2)

## Now fill in the remaining code following the commented instructions:

## Initiate a for loop that iterates across each file in files_list

#Temporary set a single file for testing-remove later
# file <- files_list[[1]]
for(file in files_list) { 
  
  # Use read.csv to read in your file as a temporary data frame called tmp
  tmp <- read.csv(file)
  # Assign participant_ID as the basename of the file
  participant_ID <- tools::file_path_sans_ext(basename(file))
  
  # Isolate the participant_ID column for the current row number (i) and assign it to be the current participant_ID variable
  dScores[i,"participant_ID"] <- participant_ID
  
  # Using similar logic, isolate the d_score OR c("emotionA_d_score", "emotionB_d_score") column(s) for the current row number (i) and assign it to be the current d-score(s) by using our calculate_IAT_dscore or calculate_EST_dscore on the tmp data file
  dScores[i,c("emotionA_d_score", "emotionB_d_score")] <- calculate_EST_dscore(tmp)
  
  # Remove the temporary data file tmp  
  rm(tmp)
  # Increase our row number variable i by one for the next iteration
  i <- i + 1
}
## Outside of the for loop, save the new dScores data frame using write.csv() into your data_cleaning/data subdirectory:
write.csv(dScores,"~/Desktop/psy1903/stats/data_cleaning/data/participant_dScores.csv", row.names = FALSE)

##Question 5
for(file in files_list) { 
  
  # Use read.csv to read in your file as a temporary data frame called tmp
  tmp <- read.csv(file)
  
  # Assign participant_ID as the basename of the file
  participant_ID <- tools::file_path_sans_ext(basename(file))
  
  # Isolate the participant_ID column for the current row number (i) and assign it to be the current participant_ID variable
  dScores[i,"participant_ID"] <- participant_ID
  
  ##Update the setup for your for loop to include two additional columns in your dScores data frame called "whichPrime" and "questionnaire".
  dScores[i, "whichPrime"] <- which_Prime
  dScores[i, "questionnaire"] <- questionnaire_score 
  
  # Using similar logic, isolate the d_score OR c("emotionA_d_score", "emotionB_d_score") column(s) for the current row number (i) and assign it to be the current d-score(s) by using our calculate_IAT_dscore or calculate_EST_dscore on the tmp data file
  dScores[i,c("emotionA_d_score", "emotionB_d_score")] <- calculate_EST_dscore(tmp)
  
  ##Following the logic of assigning the participant_ID to a single cell, assign the dScores "whichPrime" column to be the current participant's prime label. 
 est_test$whichPrime <- whichPrime
 
 ##Following the logic of assigning the "d_score" column to be the output of the calculate_*_dScore function, assign the "questionnaire" column to be the output of the score_questionnaire function.
 questionnaire_score <- score_questionnaire(tmp)
 dScores[i, "questionnaire"] <- questionnaire_score
 # Remove the temporary data file tmp  
  rm(tmp)
  # Increase our row number variable i by one for the next iteration
  i <- i + 1
}
## Outside of the for loop, save the new dScores data frame using write.csv() into your data_cleaning/data subdirectory:
write.csv(dScores,"~/Desktop/psy1903/stats/data_cleaning/data/participant_dScores.csv", row.names = FALSE)

##Outside of the for loop, before saving, check the structure of the dScores data frame and, if necessary:
  
##Change column "whichPrime" to be a factor (should have 2 or 3 levels depending on your prime).
dScores[i, "whichPrime"] <- factor(dScores[i, "whichPrime"], levels = c("emtionA", "emotionB", "neutral"))
##Change "d_score" and "questionnaire" to be numbers
questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))
dScores <- as.data.frame(lapply(dScores, as.numeric))




