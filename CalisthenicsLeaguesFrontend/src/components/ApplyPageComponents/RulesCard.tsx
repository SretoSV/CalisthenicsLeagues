import styles from '../../styles/ApplyPageStyle.module.css';

export function RulesCard(){
    return (
        <div className={styles.rulesCardMainDiv}>
            <div className={styles.headres}><b>RULES:</b></div>
            <br />
            <div>
                The qualification is based on how quickly and cleanly you can perform the required reps. Speed alone won’t guarantee your spot – every repetition must be performed with perfect form. Any incorrect rep, regardless of speed, will result in disqualification. It’s essential to pay attention to the details of each movement to ensure your reps count.
            </div>
            <br />
            <div className={styles.headres}><b>HOW TO RECORD YOUR SUBMISSION:</b></div>
            <br />
            <div>
                <b>- Camera Visibility:</b> The entire body must be fully visible throughout the routine.<br/>
                <b>- Clothing:</b> Wear clothes that do not obstruct visibility. Shirtless is best for ensuring arm extensions are visible.<br/>
                <b>- Video Format:</b> The video cannot be cut or edited. Original sound only, no added music.<br/>
                <b>- Camera Angle:</b> All movements must be recorded from a 45-degree angle at a height of 160-180cm.<br/>
            </div>
            <br />
            <div className={styles.headres}><b>SPECIFIC RECORDING GUIDELINES:</b></div>
            <br />
            <div>
                - <b>Muscle-Ups, Pull-Ups, Dips, Push-Ups, Squats:</b> Ensure the camera is set at a 45-degree angle at a height of 160-180cm for muscle-ups, pull-ups, dips, and squats, and at 10-20cm for push-ups.
            </div>
            <br />
            <div className={styles.headres}><b>DETAILED EXERCISE REQUIREMENTS:</b></div>
            <br />
            <div className={styles.exercise}>Muscle-Ups:</div>
            <br />
            <div>
                When doing muscle ups, the hand and shoulder must be at the shoulder position or slightly wider. In the bar muscle-up, the athlete must begin with the arms fully extended and the feet off the ground. Each repetition must have full extension with the arms at both the top and bottom of the movement. Kipping muscle-up is not allowed (bent knees). Legs must stay straight throughout the whole movement.
                <br /><br />
                - The athlete must start with arms fully extended, feet off the ground.<br />
                - No kipping (bent knees) allowed.<br />
                - Legs must remain straight throughout the movement.<br />
            </div>
            <br />
            <div className={styles.exercise}>Pull-Ups:</div>
            <br />
            <div>
                When doing pull-ups, pull-up grip and shoulder position must be at shoulder position or slightly wider, must start with a hang below the bar with arms fully extended and feet off the ground, with each repetition, chin must raise above the wrist and the bar, arms must also lock out at full extension in the hang position for a single repetition to count. Legs must stay straight throughout the whole movement.
                <br /><br />
                - Grip must be shoulder-width or slightly wider.<br />
                - Each rep must start from a full hang with arms fully extended, feet off the ground.<br />
                - The chin must rise above the bar on every rep.<br />
                - Legs must remain straight; no swinging or kipping allowed.<br />
            </div>
            <br />
            <div className={styles.exercise}>Dips:</div>
            <br />
            <div>
                When doing dips, using parallel bars the hands and shoulders should be in a neutral position with both ankles together. Shoulder must dip to at least 90° visible to the eye and arms must also lock out in full extension for repetition to count. Hips must go below the parallel bar on the way down for repetition to count. Excessive bending in the hips will result in a failed repetition as the hips will not pass the parallel bar level on the way down. Legs must stay straight!
                <br /><br />
                - Shoulders and hands should remain in a neutral position.<br />
                - Shoulders must drop to at least 90° at the bottom.<br />
                - Hips should pass below the level of the bars during each dip.<br />
                - Legs must remain straight with no excessive bending at the hips.<br />
            </div>
            <br />
            <div className={styles.exercise}>Push-Ups:</div>
            <br />
            <div>
                When doing push-ups, hands and shoulders must remain in a neutral position with the core engaged and both ankles together creating your plank position. The shoulders must clearly pass the elbows on the bottom part of the movement and arms must also lock out in full extension for a repetition to count. Opened legs are not allowed and will result in a failed repetition. Legs must stay straight throughout the whole movement.
                <br /><br />
                - Hands and shoulders in a neutral position, core engaged, feet together.<br />
                - Shoulders must clearly pass below the elbows.<br />
                - Arms must lock out in full extension at the top of the movement.<br />
                - Legs should remain straight with no wide stance.<br />
            </div>
            <br />
            <div className={styles.exercise}>Squats:</div>
            <br />
            <div>
                The hips must drop below knee level for the squat to count as a valid repetition, and the knees should track in line with the toes. The chest must remain upright, and the heels should stay grounded the entire time. Failing to reach the required depth or lifting the heels off the ground will result in a failed repetition. The back should stay straight, and no excessive forward leaning is allowed.
                <br /><br />
                - Hips must drop below knee level for the rep to count.<br />
                - Knees should track in line with toes, chest upright, heels grounded.<br />
                - Excessive forward leaning or heels lifting off the ground will result in a failed rep.<br />
            </div>
            <br />
        </div>   
    );
}