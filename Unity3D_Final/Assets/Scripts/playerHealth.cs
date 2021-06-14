using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class playerHealth : MonoBehaviour {

    public float fullHealth;
    float currentHealth;

    public GameObject PlayerDeadEffect;

    public Slider playerHealthSlider;

    public Image damageScreen;
    Color flashColor = new Color(255f,255f,255f,1f);
    float flashSpeed = 5f;
    bool damaged = false;


    public Text endGameText;
    public RestartGame theGameController;



    // Start is called before the first frame update
    void Awake() {
        currentHealth = fullHealth;
        playerHealthSlider.maxValue = fullHealth;
        playerHealthSlider.value = currentHealth;


        
    }

    // Update is called once per frame
    void Update() {
        if(damaged){
            damageScreen.color = flashColor;
        }else{
            damageScreen.color = Color.Lerp(damageScreen.color, Color.clear, flashSpeed*Time.deltaTime);
        }

        damaged = false;
    }

    public void addDamage (float damage){
        currentHealth -= damage;
        playerHealthSlider.value = currentHealth;
        damaged = true;

        if(currentHealth <= 0){
            makeDead();
        }
    }


    public void addHealth(float health){
        currentHealth += health;

        if(currentHealth > fullHealth){
            currentHealth = fullHealth;
        }
        playerHealthSlider.value = currentHealth;
    }



    public void makeDead(){

        Animator endGameAnim = endGameText.GetComponent<Animator>();
        endGameAnim.SetTrigger("EndGame");

        Instantiate(PlayerDeadEffect, transform.position , Quaternion.Euler(new Vector3(-90,0,0)));
        damageScreen.color = flashColor;
        Destroy (gameObject);

        theGameController.restartTheGame();

    }
}
